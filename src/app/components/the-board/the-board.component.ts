import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Observable } from 'rxjs';
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
  // timersArray = Array.from(Array(10).keys());
  timers$: Observable<any>[] = [];
  gameState = {
    running: false,
    paused: false,
    finished: false,
  };
  // difficultyOptions
  difficultyLength = 15;
  difficultyTimer = 11;
  timers = [this.difficultyTimer - 1];
  gameIsRunning$: Observable<boolean>;
  isClicked = false;
  translate;
  constructor(private gameService: GameService) {
    this.gameIsRunning$ = this.gameService.gameIsRunning$;
  }

  ngOnInit(): void {
    this.gameService.createDots(this.difficultyLength);
    Array.from(Array(this.difficultyLength).keys()).map((item, index) => {
      this.timers$.push(this.gameService.getTime(index, this.difficultyTimer));
    });
    this.timers$.forEach((time$, index) => {
      time$.subscribe((time) => {
        if (time === 0) {
          this.endGame();
          return;
        }
        this.timers[index] = time;
      });
    });
  }

  updateGameState() {
    if (this.gameState.running) return this.pauseGame();
    if (this.gameState.paused) return this.resumeGame();
    return this.startGame();
  }

  startGame(): void {
    this.gameService.startGame();
    this.gameState = { running: true, paused: false, finished: false };
  }

  resetGame() {
    this.gameService.endGame();
    this.gameState = { running: false, paused: false, finished: false };
    this.timers = [this.difficultyTimer - 1];
  }

  resetDot(event, index) {
    this.gameService.resetTimer(index);
    if (this.timers.length < this.difficultyLength) {
      this.timers.push(this.difficultyTimer);
      this.gameService.resetTimer(this.timers.length - 1);
    }
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
    this.gameService.endGame();
    this.timers = [this.difficultyTimer - 1];
    this.gameState = { running: false, paused: false, finished: true };
  }

  random(timer) {
    return Math.random() * timer;
  }

  getTranslate(timer) {
    this.translate = `translate(${this.random(timer)}, ${this.random(timer)})`;
    // return `translate(${this.random(timer)}, ${this.random(timer)})`;
  }
}
