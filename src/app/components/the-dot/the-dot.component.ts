import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-the-dot',
  templateUrl: './the-dot.component.html',
  styleUrls: ['./the-dot.component.scss'],
})
export class TheDotComponent implements OnInit {
  timers$: Observable<any>[] = [];
  difficultyLength = 15;
  difficultyTimer = 11;
  timers = [this.difficultyTimer - 1];
  gameIsRunning$: Observable<boolean>;
  gameState = {
    running: false,
    paused: false,
    finished: false,
  };

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

  endGame() {
    this.gameService.endGame();
    this.timers = [this.difficultyTimer - 1];
    this.gameState = { running: false, paused: false, finished: true };
  }

  resetDot(event, index) {
    this.gameService.resetTimer(index);
    if (this.timers.length < this.difficultyLength) {
      this.timers.push(this.difficultyTimer);
      this.gameService.resetTimer(this.timers.length - 1);
    }
  }
}
