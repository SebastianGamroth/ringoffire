import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() { console.log(this.game.players.length)
    if (this.game.players.length < 1) {
      this.openDialog();
    } else {
      console.log(this.game)
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

  avatar = '1';
  /**
   * Open dialog Window
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.avatar.push(this.avatar);

        console.log(name,this.avatar)
      }
    });
  }
}
