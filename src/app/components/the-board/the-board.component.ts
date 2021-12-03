import { Component, OnInit } from '@angular/core';
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
  timersArray = Array.from(Array(10).keys());
  timers$ = [];
  difficultyLength = 15;
  difficultyTimer = 11;
  timers = [this.difficultyTimer - 1];
  gameIsOver = false;

  constructor(private gameService: GameService) {}

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

  startGame() {
    this.gameIsOver = false;
    this.gameService.startGame();
  }

  resetGame() {
    this.gameService.endGame();
    this.gameIsOver = false;
    this.timers = [this.difficultyTimer - 1];
  }

  resetDot(index) {
    this.gameService.resetTimer(index);
    if (this.timers.length < this.difficultyLength) {
      this.timers.push(this.difficultyTimer);
      this.gameService.resetTimer(this.timers.length - 1);
    }
  }

  pauseGame() {
    this.gameService.pauseGame(this.timers);
  }

  resumeGame() {
    this.gameService.resumeGame(this.timers);
  }

  endGame() {
    this.gameService.endGame();
    this.timers = [this.difficultyTimer - 1];
    this.gameIsOver = true;
  }
}
