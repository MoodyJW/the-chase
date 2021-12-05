import { Injectable } from '@angular/core';
import { timer, of, Subject, BehaviorSubject } from 'rxjs';
import { switchMap, scan, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  dots$: Subject<string>[];
  timer: number;
  gameIsRunning$ = new BehaviorSubject(false);

  createDots(difficulty) {
    this.dots$ = Array.from({ length: difficulty }, () => new Subject());
  }

  getTime(index, startTime) {
    return this.dots$[index].pipe(
      switchMap((state) => this.checkState(state, index, startTime))
    );
  }

  checkState(state, index, startTime) {
    let returnValue;
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

  startGame() {
    this.dots$[0].next('start');

    this.gameIsRunning$.next(true);
  }

  resetTimer(index) {
    this.dots$[index].next('start');
  }

  pauseGame(timers) {
    timers.forEach((timer, index) => {
      this.dots$[index].next('pause');
    });

    this.gameIsRunning$.next(false);
  }

  resumeGame(timers) {
    timers.forEach((timer, index) => {
      this.timer = timer + 1;
      this.dots$[index].next('resume');
    });

    this.gameIsRunning$.next(true);
  }

  endGame() {
    this.dots$.forEach((dot) => {
      dot.next('stop');
    });

    this.gameIsRunning$.next(false);
  }
}
