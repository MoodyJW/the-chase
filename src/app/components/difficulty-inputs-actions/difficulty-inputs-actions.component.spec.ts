import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifficultyInputsActionsComponent } from './difficulty-inputs-actions.component';

describe('DifficultyInputsActionsComponent', () => {
  let component: DifficultyInputsActionsComponent;
  let fixture: ComponentFixture<DifficultyInputsActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DifficultyInputsActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DifficultyInputsActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
