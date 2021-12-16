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
      style({
        opacity: 0,
        transform: 'translateX(-20vw)',
        textShadow: '0 0 32px white',
      }),
      animate(
        '666ms ease-out',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
    ]),
    transition(':leave', [
      animate(
        '666ms ease-in',
        style({
          opacity: 0,
          transform: 'translateX(-20vw)',
        })
      ),
    ]),
  ]),
];

export const enterExitRight = [
  trigger('enterExitRight', [
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateX(20vw)',
        textShadow: '0 0 32px white',
      }),
      animate(
        '666ms ease-out',
        style({ opacity: 1, transform: 'translateX(0)' })
      ),
    ]),
    transition(':leave', [
      animate(
        '666ms ease-in',
        style({ opacity: 0, transform: 'translateX(20vw)' })
      ),
    ]),
  ]),
];
