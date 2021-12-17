import { Component } from '@angular/core';
import { Observable } from 'rxjs';

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
  borderIsBlinking = false;

  setTimers(dotTimersEvent: Observable<string | number>[]) {
    dotTimersEvent.forEach((timer) => {
      timer.subscribe((time) => {
        if (time == 0) {
          this.borderIsBlinking = false;
          return;
        }
        if (time <= 2) this.borderIsBlinking = true;
      });
    });
  }
}
