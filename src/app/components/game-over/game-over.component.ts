import { Component, OnInit } from '@angular/core';

import {
  container,
  enterExitRight,
  enterExitLeft,
} from '../../animations/game-over.animation';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss'],

  animations: [container, enterExitRight, enterExitLeft],
})
export class GameOverComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
