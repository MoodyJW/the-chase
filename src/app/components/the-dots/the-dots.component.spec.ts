import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheDotsComponent } from './the-dots.component';

describe('TheDotComponent', () => {
  let component: TheDotsComponent;
  let fixture: ComponentFixture<TheDotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TheDotsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheDotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
