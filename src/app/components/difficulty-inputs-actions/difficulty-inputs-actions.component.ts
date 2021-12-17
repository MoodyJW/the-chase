import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-difficulty-inputs-actions',
  templateUrl: './difficulty-inputs-actions.component.html',
  styleUrls: ['./difficulty-inputs-actions.component.scss'],
})
export class DifficultyInputsActionsComponent implements OnInit {
  currentGameClock = 5;
  gameClock$;
  gameIsRunning$ = this.gameService.gameIsRunning$;
  gameIsPaused$ = this.gameService.gameIsPaused$;
  gameClockMax = 6;
  dotTimerStart = 11;
  maxNumberOfDots = 5;
  readonly gameClockMin = -1;
  difficultySettingsFormGroup: FormGroup;
  unsubscribe$ = new Subject();

  constructor(
    private gameService: GameService,
    private formBuilder: FormBuilder
  ) {
    this.difficultySettingsFormGroup = this.formBuilder.group({
      numberOfDots: [this.maxNumberOfDots, Validators.required],
      dotTimers: [this.dotTimerStart, Validators.required],
      gameClockMax: [this.currentGameClock + 1, Validators.required],
    });
  }

  ngOnInit(): void {
    this.gameService.setGameDifficulties(
      this.gameClockMax,
      this.maxNumberOfDots,
      this.dotTimerStart
    );
  }

  updateGameState(): void {
    if (this.gameIsRunning$.getValue()) this.pauseGame();
    else if (this.gameIsPaused$.getValue()) this.resumeGame();
    else {
      this.startGame();
    }
  }

  resetGame(): void {
    this.gameService.resetGame();
  }

  openSettingsDialog(): void {
    // open a dialog
  }

  private startGame(): void {
    this.getGameClock();
    this.gameService.startGame();
  }

  private pauseGame(): void {
    this.gameService.pauseGame();
  }

  private resumeGame(): void {
    this.gameService.resumeGame();
  }

  private getGameClock(): void {
    this.gameService.gameClockNeedsReset$
      .pipe(
        filter((needsReset: boolean) => needsReset),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.gameService.updateGameClock(this.gameClockMax);
      });
    this.gameClock$ = this.gameService.getGameClock(this.gameClockMax);
    this.gameClock$.subscribe((time) => {
      if (time === this.gameClockMin) {
        console.log(time);
        this.currentGameClock = this.gameClockMax;
        return;
      }
      this.currentGameClock = time;
    });
  }
}
