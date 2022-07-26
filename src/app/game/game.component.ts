import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AlltasksService } from '../alltasks.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game; // Array

  // private route:ActivatedRoute - game mit id Variable
  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog, public alltasks: AlltasksService) { }

  ngOnInit(): void {
    this.newGame();

    // logge mir id aus
    this.route.params.subscribe((params) => {
      console.log(params['id']);

      // übergebe die id
      // Zugriff auf firebase Datenbank - games, abonieren mit subscribe, game auslesen.
      this.firestore.collection('games').doc(params['id']).valueChanges().subscribe((game: any) => {
        console.log('game update ', game);
        this.game.currentPlayer = game.currentPlayer;
        this.game.playerCards = game.playerCards;
        this.game.players = game.players;
        this.game.stack = game.stack;
      });

    });
  }


  newGame() {
    this.game = new Game();
    console.log(this.game);
    // neues Objekt in fireBase Datenbak hizufügen
    // this.firestore.collection('games').add({ 'Hallo': 'Welt' });

    // Arrays aus games - umgewandelt in Json - hinzugefügt in firestore Datenbank
    this.firestore.collection('games').add(this.game.toJson());
  }

  /**
   * takes a card from the stack and lays it out
   */
  takeCard() {
    if (this.game.players.length < 1) {
      this.openDialog();
    } else {
      // repeat animation every 1sec
      if (!this.pickCardAnimation) {
        // currentCard = last value from array && pop deletes last value from array 
        this.currentCard = this.game.stack.pop();
        this.pickCardAnimation = true;

        // current Player ++ % max player length loop
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

        // reset animation after 1sec & push currentCard to playerCards
        setTimeout(() => {
          this.game.playerCards.push(this.currentCard);
          this.pickCardAnimation = false;
        }, 1000);
      }
    }
  }

  /**
   * Open window to create player
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);

        this.alltasks.task.push(this.alltasks.avatarPic)

        console.log(this.alltasks.task)
        console.log(this.game.players)
      }
    });
  }
}
