import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AlltasksService } from '../alltasks.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  // pickCardAnimation = false;
  // currentCard: string = '';
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

        this.game.avatars = game.avatars;
        this.game.pickCardAnimation = game.pickCardAnimation;
        this.game.currentCard = game.currentCard;
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
      if (!this.game.pickCardAnimation) {
        // currentCard = last value from array && pop deletes last value from array 
        this.game.currentCard = this.game.stack.pop();
        this.game.pickCardAnimation = true;
        // current Player ++ % max player length loop
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        // speichern sobald karte aus stappel entfernt wurde
        this.saveGame();
        // reset animation after 1sec & push currentCard to playerCards
        setTimeout(() => {
          this.game.playerCards.push(this.game.currentCard);
          this.game.pickCardAnimation = false;
          // speichern sobald karte hinzugefügt wurde
          this.saveGame();
        }, 1000);
      }
    }
  }

  // 
  editPlayer(playerId: number) {
    console.log(playerId)
    const dialogRef = this.dialog.open(EditPlayerComponent);

    dialogRef.afterClosed().subscribe((change: string) => {
   
      console.log(change)
// video Bonus 2 - Ready for production - Wir releasen 16min
    });

  }

  /**
   * create new player - open Dialog Window
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {

        this.game.players.push(name);

        this.game.avatars.push(this.alltasks.avatarPic)

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
