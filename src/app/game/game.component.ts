import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game;

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
    // repeat animation every 1.5sec
    if (!this.pickCardAnimation) {
      // currentCard = last value from array && pop deletes last value from array 
      this.currentCard = this.game.stack.pop();
      console.log(this.currentCard)
      this.pickCardAnimation = true;

      // reset animation after 1.5sec
      setTimeout(() => {
        this.pickCardAnimation = false;
      }, 1500);
    }
  }

}
