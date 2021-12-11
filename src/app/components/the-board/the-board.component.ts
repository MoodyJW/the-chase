import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';

import {
  container,
  enterExitRight,
  enterExitLeft,
} from '../../animations/game-over-animation';
import { GameService } from 'src/app/services/game.service';

export interface Dot {
  timer: Observable<number>;
  id: number;
}

@Component({
  selector: 'app-the-board',
  templateUrl: './the-board.component.html',
  styleUrls: ['./the-board.component.scss'],
  animations: [container, enterExitRight, enterExitLeft],
})
export class TheBoardComponent implements OnInit {
  timers$: Observable<number | string>[] = [];
  gameState = {
    running: false,
    paused: false,
    finished: false,
  };
  isDisplayed = false;
  // difficultyOptions
  difficultyLength = 10;
  difficultyTimer = 11;
  timers: any = [this.difficultyTimer - 1];
  gameIsRunning$: Observable<boolean>;
  isClicked = false;
  translate;
  buttonLocations: { xPosition: number; yPosition: number }[] = [];
  boardWidth: number;
  boardHeight: number;

  constructor(
    private gameService: GameService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.gameIsRunning$ = this.gameService.gameIsRunning$;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.boardWidth = window.innerWidth - 32;
    this.boardHeight = window.innerHeight * 0.8;
  }
  ngOnInit(): void {
    this.boardWidth = window.innerWidth - 32;
    this.boardHeight = window.innerHeight * 0.8;
    this.gameService.createDots(this.difficultyLength);
    Array.from(Array(this.difficultyLength).keys()).map((item, index) => {
      this.timers$.push(this.gameService.getTime(index, this.difficultyTimer));
    });
    this.timers$.forEach((time$, index) => {
      if (index > 9) return;
      time$.subscribe((time) => {
        if (time === 0) {
          this.endGame();
          return;
        }
        this.timers[index] = time;
        this.setColor(time, index);
      });
    });
  }

  setColor(time, index): void {
    let btn = this.document.getElementById(index);
    if (!btn) return;
    if (time > 7) {
      btn.style.backgroundColor = 'green';
      return;
    }
    if (time <= 1) {
      btn.style.backgroundColor = 'red';
      return;
    }
    if (time > 1 && time < 4) {
      btn.style.backgroundColor = 'pink';
      return;
    }
    if (time > 4 && time < 7) {
      btn.style.backgroundColor = 'yellow';
      return;
    }
  }

  updateGameState() {
    if (this.gameState.running) return this.pauseGame();
    if (this.gameState.paused) return this.resumeGame();
    return this.startGame();
  }

  startGame(): void {
    this.isDisplayed = false;
    this.timers = [this.difficultyTimer - 1];
    this.gameService.startGame();
    this.gameState = { running: true, paused: false, finished: false };
  }

  resetGame() {
    this.isDisplayed = false;
    this.gameService.endGame();
    this.gameState = { running: false, paused: false, finished: false };
    this.timers = [];
  }

  resetDot(event, index) {
    this.gameService.resetTimer(index);
    if (this.timers.length < this.difficultyLength) {
      this.timers.push(this.difficultyTimer);
      this.gameService.resetTimer(this.timers.length - 1);
    }
    // let elem = this.document.getElementById(index);
    let btns = Array.from(this.document.getElementsByClassName('dot'));
    btns.forEach((btn, idx) => {
      const x = Math.random() * (this.boardWidth - 100);
      const y = Math.random() * (this.boardHeight - 100);
      let elem = this.document.getElementById(idx.toString());
      elem.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
  }

  pauseGame() {
    this.gameService.pauseGame(this.timers);
    this.gameState = { running: false, paused: true, finished: false };
  }

  resumeGame() {
    this.gameService.resumeGame(this.timers);
    this.gameState = { running: true, paused: false, finished: false };
  }

  endGame() {
    this.isDisplayed = true;
    this.gameService.endGame();
    this.timers = [this.difficultyTimer - 1];
    this.gameState = { running: false, paused: false, finished: true };
  }

  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
