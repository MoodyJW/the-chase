import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheDotComponent } from './the-dots.component';

describe('TheDotComponent', () => {
  let component: TheDotComponent;
  let fixture: ComponentFixture<TheDotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TheDotComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheDotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
