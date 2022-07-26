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
  gamesId: string; // url id aus Firebase Projekt

  // private route:ActivatedRoute - game mit id Variable
  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog, public alltasks: AlltasksService) { }

  ngOnInit(): void {
    this.newGame();

    // logge mir id aus
    this.route.params.subscribe((params) => {
      console.log(params['id']);

      // id an gamesId übergeben
      this.gamesId = params['id'];
      // übergebe die id
      // Zugriff auf firebase Datenbank - games, abonieren mit subscribe, game auslesen.
      this.firestore.collection('games').doc(this.gamesId).valueChanges().subscribe((game: any) => {
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
        // speichern sobald karte aus stappel entfernt wurde
        this.saveGame();

        // current Player ++ % max player length loop
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

        // reset animation after 1sec & push currentCard to playerCards
        setTimeout(() => {
          this.game.playerCards.push(this.currentCard);
          this.pickCardAnimation = false;
          // speichern sobald karte hinzugefügt wurde
          this.saveGame();
        }, 1000);
      }
    }
  }

  /**
   * create new player - open Dialog Window
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {

        this.game.players.push(name);

        this.alltasks.task.push(this.alltasks.avatarPic)

        this.saveGame();
      }
    });
  }

  /**
   * Game mit aktueller Id speichern
   */
  saveGame() {
    this.firestore.collection('games').doc(this.gamesId).update(this.game.toJson());
  }
}
