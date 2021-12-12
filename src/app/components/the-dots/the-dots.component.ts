import {
  Component,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { GameService } from 'src/app/services/game.service';
import {
  container,
  enterExitRight,
  enterExitLeft,
} from '../../animations/game-over-animation';

@Component({
  selector: 'app-the-dots',
  templateUrl: './the-dots.component.html',
  styleUrls: ['./the-dots.component.scss'],
  animations: [container, enterExitRight, enterExitLeft],
})
export class TheDotsComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject();
  timers$: Observable<number | string>[] = [];
  gameIsRunning$ = this.gameService.gameIsRunning$;
  gameIsOver$ = this.gameService.gameIsOver$;
  gameIsPaused$ = this.gameService.gameIsPaused$;

  dotSize = 100;
  difficultyLength = 10;
  difficultyTimer = 11;
  paddingPixelsCombined = 32;
  boardHeightPercentage = 0.8;
  boardWidth: number;
  boardHeight: number;

  timers: any[] = [this.difficultyTimer - 1];

  isDisplayed = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private gameService: GameService
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.setBoardDimensions();
  }

  ngOnInit(): void {
    this.setBoardDimensions();
    this.gameService.createDots(this.difficultyLength);
    this.subscribeToGameStates();
    this.buildTimers();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

  buildTimers(): void {
    Array.from(Array(this.difficultyLength).keys()).map((item, index) => {
      this.timers$.push(this.gameService.getTime(index, this.difficultyTimer));
    });
    this.timers$.forEach((time$, index) => {
      if (index > this.difficultyLength - 1) return;
      time$.pipe(takeUntil(this.unsubscribe$)).subscribe((time) => {
        if (time === 0) {
          this.endGame();
          return;
        }
        this.timers[index] = time;
        this.setColor(time, index);
      });
    });
  }

  subscribeToGameStates(): void {
    this.gameIsPaused$
      .pipe(
        filter((isPaused: boolean) => isPaused),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => this.gameService.updateTimers(this.timers));

    this.gameIsOver$
      .pipe(
        filter((isOver: boolean) => !isOver),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.timers = [this.difficultyTimer - 1];
        this.gameService.updateTimers(this.timers);
      });

    this.gameService.timersNeedReset$
      .pipe(
        filter((needsReset: boolean) => needsReset),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.timers = [this.difficultyTimer - 1];
      });
  }

  setBoardDimensions(): void {
    this.boardWidth = window.innerWidth - this.paddingPixelsCombined;
    this.boardHeight = window.innerHeight * this.boardHeightPercentage;
  }

  setColor(time: number | string, index: number): void {
    const btn = this.document.getElementById(index.toString());
    if (!btn) return;
    if (time > this.difficultyTimer * 0.66 || time === '0') {
      btn.style.backgroundColor = 'green';
      btn.style.zIndex = '1';
      return;
    }
    if (
      time > this.difficultyTimer * 0.44 &&
      time < this.difficultyTimer * 0.66
    ) {
      btn.style.backgroundColor = 'yellow';
      btn.style.zIndex = '2';
      return;
    }
    if (
      time > this.difficultyTimer * 0.22 &&
      time < this.difficultyTimer * 0.44
    ) {
      btn.style.backgroundColor = 'pink';
      btn.style.zIndex = '3';
      return;
    }
    if (time <= this.difficultyTimer * 0.22) {
      btn.style.backgroundColor = 'red';
      btn.style.zIndex = '4';
      return;
    }
  }

  resetDot(index: number): void {
    this.gameService.resetTimer(index);
    if (this.timers.length < this.difficultyLength) {
      this.timers.push(this.difficultyTimer);
      this.gameService.resetTimer(this.timers.length - 1);
    }
    const btns = Array.from(this.document.getElementsByClassName('dot'));
    btns.forEach((btn) => {
      const dimensions: { x: number; y: number } = this.random();
      const dotElem = btn as HTMLButtonElement;
      dotElem.style.transform = `translateX(${dimensions.x}px) translateY(${dimensions.y}px)`;
    });
  }

  endGame(): void {
    this.isDisplayed = true;
    this.gameService.endGame();
    this.timers = [this.difficultyTimer - 1];
  }

  random(): { x: number; y: number } {
    return {
      x: Math.random() * (this.boardWidth - this.dotSize),
      y: Math.random() * (this.boardHeight - this.dotSize),
    };
  }
}