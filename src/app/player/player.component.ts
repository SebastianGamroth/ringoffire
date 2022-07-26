import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  // name comes from game.componente
  @Input() name;
  @Input() avatar;
  @Input() playerActive: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

}
