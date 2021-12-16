import { Component } from '@angular/core';
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
export class TheBoardComponent {
  gameIsRunning$ = this.gameService.gameIsRunning$;
  gameIsPaused$ = this.gameService.gameIsPaused$;
  gameClock$;
  gameClockMax = 6;
  readonly gameClockMin = -1;
  gameClock;
  constructor(private gameService: GameService) {}

  updateGameState(): void {
    if (this.gameIsRunning$.getValue()) this.pauseGame();
    else if (this.gameIsPaused$.getValue()) this.resumeGame();
    else {
      this.startGame();
    }
  }

  resetGame(): void {
    this.gameService.resetGame();
  }

  private startGame(): void {
    this.getGameClock();
    this.gameService.startGame();
  }

  private pauseGame(): void {
    this.gameService.pauseGame();
  }

  private resumeGame(): void {
    this.gameService.resumeGame();
  }

  private getGameClock(): void {
    this.gameClock$ = this.gameService.getGameClock(this.gameClockMax);
    this.gameClock$.subscribe((time) => {
      if (time === this.gameClockMin) {
        this.gameClock = this.gameClockMax;
        return;
      }
      this.gameClock = time;
    });
  }
}
