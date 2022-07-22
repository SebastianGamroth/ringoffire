import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  // game: Game;
  game: Game[] = [];

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    // this.game = new Game();
    this.game[0] = new Game();
    // console.log(this.game[0]);
    console.log(this.game[0]);
  }

  takeCard() {
    this.pickCardAnimation = true;
  }

}
