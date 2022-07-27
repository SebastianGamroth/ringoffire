import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-mobile',
  templateUrl: './player-mobile.component.html',
  styleUrls: ['./player-mobile.component.scss']
})
export class PlayerMobileComponent implements OnInit {

  // name comes from game.componente
  @Input() name;
  @Input() avatar;
  @Input() playerActive: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
