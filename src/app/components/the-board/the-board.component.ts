import {
  Component,
  EventEmitter,
  HostListener,
  Inject,
  OnInit,
  Output,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

import { GameService } from 'src/app/services/game.service';

export interface Dot {
  timer: Observable<number>;
  id: number;
}

@Component({
  selector: 'app-the-board',
  templateUrl: './the-board.component.html',
  styleUrls: ['./the-board.component.scss'],
})
export class TheBoardComponent implements OnInit {
  timers$: Observable<number | string>[] = [];
  // gameState = {
  //   running: false,
  //   paused: false,
  //   finished: false,
  // };
  // timersHaveReset = false;
  // isDisplayed = false;
  // difficultyOptions
  difficultyLength = 10;
  difficultyTimer = 11;
  // timers: any = [this.difficultyTimer - 1];
  gameIsRunning$: BehaviorSubject<boolean>;
  gameIsPaused$: BehaviorSubject<boolean>;
  isClicked = false;
  translate;
  buttonLocations: { xPosition: number; yPosition: number }[] = [];
  dotSize = 100;
  boardWidth: number;
  boardHeight: number;

  constructor(
    private gameService: GameService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.gameIsRunning$ = this.gameService.gameIsRunning$;
    this.gameIsPaused$ = this.gameService.gameIsPaused$;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.boardWidth = window.innerWidth - 32;
    this.boardHeight = window.innerHeight * 0.8;
  }
  ngOnInit(): void {
    this.boardWidth = window.innerWidth - 32;
    this.boardHeight = window.innerHeight * 0.8;
    // this.gameService.createDots(this.difficultyLength);
    // Array.from(Array(this.difficultyLength).keys()).map((item, index) => {
    //   this.timers$.push(this.gameService.getTime(index, this.difficultyTimer));
    // });
    // this.timers$.forEach((time$, index) => {
    //   if (index > 9) return;
    //   time$.subscribe((time) => {
    //     if (time === 0) {
    //       this.endGame();
    //       return;
    //     }
    //     this.timers[index] = time;
    //     console.log(this.timers, 'sub');
    //     this.setColor(time, index);
    //   });
    // });
  }

  // setColor(time, index): void {
  //   let btn = this.document.getElementById(index);
  //   if (!btn) return;
  //   if (time > 7) {
  //     btn.style.backgroundColor = 'green';
  //     return;
  //   }
  //   if (time <= 1) {
  //     btn.style.backgroundColor = 'red';
  //     btn.style.zIndex = '1';
  //     return;
  //   }
  //   if (time > 1 && time < 4) {
  //     btn.style.backgroundColor = 'pink';
  //     btn.style.zIndex = '999';
  //     return;
  //   }
  //   if (time > 4 && time < 7) {
  //     btn.style.backgroundColor = 'yellow';
  //     btn.style.zIndex = '1';
  //     return;
  //   }
  // }

  updateGameState() {
    if (this.gameIsRunning$.getValue()) this.pauseGame();
    else if (this.gameIsPaused$.getValue()) this.resumeGame();
    else {
      this.startGame();
    }
  }

  startGame(): void {
    // this.isDisplayed = false;
    console.log('TheBoard startGame()');
    // this.timers = [this.difficultyTimer - 1];
    this.gameService.startGame();
    // this.gameState = { running: true, paused: false, finished: false };
  }

  resetGame() {
    // this.isDisplayed = false;
    this.gameService.resetGame();
    // this.gameState = { running: false, paused: false, finished: false };
    // this.timers = [];
  }

  // resetDot(event, index) {
  //   this.gameService.resetTimer(index);
  //   if (this.timers.length < this.difficultyLength) {
  //     this.timers.push(this.difficultyTimer);
  //     this.gameService.resetTimer(this.timers.length - 1);
  //   }
  //   let btns = Array.from(this.document.getElementsByClassName('dot'));
  //   btns.forEach((btn, idx) => {
  //     const x = this.random(this.boardWidth);
  //     const y = this.random(this.boardHeight);
  //     let elem = this.document.getElementById(idx.toString());
  //     elem.style.transform = `translateX(${x}px) translateY(${y}px)`;
  //   });
  // }

  pauseGame() {
    this.gameService.pauseGame();
    // this.gameState = { running: false, paused: true, finished: false };
  }

  resumeGame() {
    console.log('TheBoard resumeGame()');
    this.gameService.resumeGame();
    // this.gameState = { running: true, paused: false, finished: false };
  }

  endGame() {
    // this.isDisplayed = true;
    this.gameService.endGame();
    // console.log(this.timers, 'end');
    // this.timers = [this.difficultyTimer - 1];
    // this.gameState = { running: false, paused: false, finished: true };
  }

  random(dimension: number) {
    return Math.random() * (dimension - this.dotSize);
  }
}
