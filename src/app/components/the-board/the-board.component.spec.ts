import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheBoardComponent } from './the-board.component';

describe('TheBoardComponent', () => {
  let component: TheBoardComponent;
  let fixture: ComponentFixture<TheBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
