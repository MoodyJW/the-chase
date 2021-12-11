import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
import { HostBinding } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

export let v = 300;
@Component({
  selector: 'app-the-dot',
  templateUrl: './the-dot.component.html',
  styleUrls: ['./the-dot.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state(
        'open',
        style({
          transform: `translate(${v}px, 50%)`,
        })
      ),
      state(
        'closed',
        style({
          transform: `translate(${v}px, 50%)`,
        })
      ),
      transition('open => closed', [animate('.2s')]),
      transition('closed => open', [animate('0.5s')]),
    ]),
  ],
})
export class TheDotComponent implements OnInit {
  isOpen = true;
  values = Math.random() * 300;
  toggle() {
    this.isOpen = !this.isOpen;
    v = Math.random() * 300;
  }

  ngOnInit() {}
}
// transform: translate(120px, 50%);
