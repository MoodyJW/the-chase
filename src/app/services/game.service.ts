import { Injectable } from '@angular/core';
import { timer, of, Subject, BehaviorSubject, Observable } from 'rxjs';
import { switchMap, scan, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  dots$: Subject<string>[];
  timer: number;
  timers;
  gameIsRunning$ = new BehaviorSubject(false);
  gameIsOver$ = new BehaviorSubject(false);
  gameIsPaused$ = new BehaviorSubject(false);
  timersNeedReset$ = new BehaviorSubject(false);

  createDots(difficultyLength: number): void {
    this.dots$ = Array.from({ length: difficultyLength }, () => new Subject());
  }

  getTime(index: number, startTime: number): Observable<number | string> {
    return this.dots$[index].pipe(
      switchMap((state) => this.checkState(state, index, startTime))
    );
  }

  checkState(
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

  startGame(): void {
    this.dots$[0].next('start');
    this.gameIsRunning$.next(true);
    this.gameIsPaused$.next(false);
    this.gameIsOver$.next(false);
  }

  resetTimer(index): void {
    this.dots$[index].next('start');
  }

  pauseGame(): void {
    // timers.forEach((timer, index) => {
    //   this.dots$[index].next('pause');
    // });
    this.dots$.forEach((dot) => {
      dot.next('pause');
    });
    this.gameIsPaused$.next(true);
    this.gameIsRunning$.next(false);
    this.timersNeedReset$.next(false);
  }

  updateTimers(timers) {
    this.timers = timers;
  }

  resumeGame(): void {
    console.log('service, resumeGame()');
    this.timers.forEach((timer, index) => {
      console.log(timer);
      this.timer = timer + 1;
      this.dots$[index].next('resume');
    });
    // debugger;
    // this.dots$.forEach((dot) => {
    //   this.timer = +1;
    //   dot.next('resume');
    // });
    this.gameIsPaused$.next(false);
    this.gameIsRunning$.next(true);

    this.timersNeedReset$.next(false);
  }

  resetGame(): void {
    this.stopDots();
    this.gameIsRunning$.next(false);
    this.gameIsPaused$.next(false);
    this.gameIsOver$.next(false);
  }

  endGame(): void {
    this.stopDots();
    this.gameIsPaused$.next(false);
    this.gameIsRunning$.next(false);
    this.gameIsOver$.next(true);
  }

  stopDots(): void {
    this.timersNeedReset$.next(true);
    this.dots$.forEach((dot) => {
      dot.next('stop');
    });
  }
}
