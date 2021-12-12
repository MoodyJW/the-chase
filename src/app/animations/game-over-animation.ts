import {
  trigger,
  transition,
  query,
  animateChild,
  style,
  animate,
} from '@angular/animations';

export const container = [
  trigger('container', [
    transition(':enter, :leave', [query('@*', animateChild())]),
  ]),
];

export const enterExitLeft = [
  trigger('enterExitLeft', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateX(-200px)' }),
      animate(
        '300ms ease-in',
        style({ opacity: 1, transform: 'translateX(0)' })
      ),
    ]),
    transition(':leave', [
      animate(
        '300ms ease-in',
        style({ opacity: 0, transform: 'translateX(-200px)' })
      ),
    ]),
  ]),
];

export const enterExitRight = [
  trigger('enterExitRight', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateX(200px)' }),
      animate(
        '300ms ease-in',
        style({ opacity: 1, transform: 'translateX(0)' })
      ),
    ]),
    transition(':leave', [
      animate(
        '300ms ease-in',
        style({ opacity: 0, transform: 'translateX(200px)' })
      ),
    ]),
  ]),
];
