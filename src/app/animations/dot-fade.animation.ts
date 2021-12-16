import { trigger, transition, style, animate } from '@angular/animations';

export const dotFadeInOut = [
  trigger('dotFadeInOut', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('666ms ease-out', style({ opacity: 1 })),
    ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate('666ms ease-in', style({ opacity: 0 })),
    ]),
  ]),
];
