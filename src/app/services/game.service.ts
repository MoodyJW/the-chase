import { Injectable } from '@angular/core';
import { timer, of, Subject, BehaviorSubject, Observable } from 'rxjs';
import { switchMap, scan, take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  readonly gameClockMin = -1;

  difficultyLength: number;
  difficultyTimer: number;
  gameClock: number;
  gameClockMax: number;
  timer: number;
  timers: number[];

  dots$: Subject<string>[];
  gameClock$: Subject<string> = new Subject();
  gameClockNeedsReset$ = new BehaviorSubject(false);
  gameIsOver$ = new BehaviorSubject(false);
  gameIsPaused$ = new BehaviorSubject(false);
  gameIsRunning$ = new BehaviorSubject(false);
  timersNeedReset$ = new BehaviorSubject(false);

  createDots(): void {
    this.dots$ = Array.from(
      { length: this.difficultyLength },
      () => new Subject()
    );
  }

  getTime(index: number, startTime: number): Observable<number | string> {
    return this.dots$[index].pipe(
      switchMap((state) => this.checkState(state, index, startTime))
    );
  }

  getGameClock(startTime) {
    return this.gameClock$.pipe(
      switchMap((state) => this.checkGameClockState(state, startTime))
    );
  }

  setGameDifficulties(
    gameClockMax: number,
    difficultyLength: number,
    difficultyTimer: number
  ) {
    this.gameClockMax = gameClockMax;
    this.difficultyLength = difficultyLength;
    this.difficultyTimer = difficultyTimer;
  }

  updateGameClock(currentTime) {
    this.gameClock = currentTime;
  }

  startGame(): void {
    this.updateGameClock(this.gameClockMax);
    this.dots$[0].next('start');
    this.gameClock$.next('start');
    this.gameIsRunning$.next(true);
    this.gameIsPaused$.next(false);
    this.gameIsOver$.next(false);
  }

  resetTimer(index: number): void {
    this.dots$[index].next('start');
  }

  pauseGame(): void {
    this.dots$.forEach((dot) => {
      dot.next('pause');
    });
    this.gameClock$.next('pause');
    this.gameClockNeedsReset$.next(true);
    this.gameIsPaused$.next(true);
    this.gameIsRunning$.next(false);
    this.timersNeedReset$.next(false);
  }

  updateTimers(timers: number[]): void {
    this.timers = timers;
  }

  resumeGame(): void {
    this.timers.forEach((timer, index) => {
      this.timer = timer + 1;
      this.dots$[index].next('resume');
    });
    this.gameClock$.next('resume');
    this.gameClockNeedsReset$.next(true);
    this.gameIsPaused$.next(false);
    this.gameIsRunning$.next(true);
    this.timersNeedReset$.next(false);
  }

  resetGame(): void {
    this.stopDots();
    this.gameClock$.next('pause');
    this.gameIsRunning$.next(false);
    this.gameIsPaused$.next(false);
    this.gameIsOver$.next(false);
  }

  endGame(): void {
    this.stopDots();
    this.gameClock$.next('pause');
    this.gameIsPaused$.next(false);
    this.gameIsRunning$.next(false);
    this.gameIsOver$.next(true);
  }

  private stopDots(): void {
    this.timersNeedReset$.next(true);
    this.dots$.forEach((dot) => {
      dot.next('stop');
    });
  }

  private checkState(
    state: string,
    index: number,
    startTime: number
  ): Observable<number | string> {
    let returnValue: Observable<number | string>;
    switch (state) {
      case 'start':
        returnValue = timer(0, 1000).pipe(
          scan((acc) => --acc, startTime),
          take(startTime)
        );
        break;
      case 'pause':
        returnValue = this.dots$[index];
        break;
      case 'resume':
        returnValue = timer(0, 1000).pipe(
          scan((acc) => --acc, this.timer),
          take(startTime)
        );
        break;
      default:
        return of('0');
    }
    return returnValue;
  }

  private checkGameClockState(
    state: string,
    startTime: number
  ): Observable<number | string> {
    let returnValue$: Observable<number | string>;
    switch (state) {
      case 'start':
        const startObs$ = timer(0, 1000).pipe(
          scan((acc) => --acc, startTime),
          take(startTime)
        );
        const startClock$ = startObs$.pipe(
          map((secondsRemaining) => {
            console.log(secondsRemaining);
            if (secondsRemaining === 0) {
              if (this.timers.length < this.difficultyLength) {
                this.timers.push(this.difficultyTimer);
                this.gameClock$.next('start');
              }
            }
            return secondsRemaining;
          })
        );
        returnValue$ = startClock$;
        break;
      case 'pause':
        returnValue$ = this.gameClock$;
        break;
      case 'resume':
        console.log(startTime);
        const resumeObs$ = timer(0, 1000).pipe(
          scan((acc) => --acc, this.gameClock + 1),
          take(startTime)
        );
        const resumeClock$ = resumeObs$.pipe(
          map((secondsRemaining) => {
            if (secondsRemaining === this.gameClockMin) {
              if (this.timers.length < this.difficultyLength)
                this.timers.push(this.difficultyTimer);
              this.gameClock$.next('start');
            }
            return secondsRemaining;
          })
        );
        returnValue$ = resumeClock$;
        break;
      default:
        return of('0');
    }
    return returnValue$;
  }
}
