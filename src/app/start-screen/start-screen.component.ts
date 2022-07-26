import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  constructor(private firestore: AngularFirestore, private router: Router) { }

  ngOnInit(): void {
  }

  newGame() {
    let game = new Game;
    // neues Siel erstellen
    // Arrays aus games - umgewandelt in Json - hinzugefügt in firestore Datenbank
    // .then wird nur einmal aufgerufen
    this.firestore.collection('games').add(game.toJson()).then((gameInfo: any) => {
      // console.log(gameInfo);

      // start Game mit neuer id
      this.router.navigateByUrl('/game/' + gameInfo.id);
    });
  } 
}
