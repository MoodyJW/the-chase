import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { TheBoardComponent } from './components/the-board/the-board.component';
import { TheDotsComponent } from './components/the-dots/the-dots.component';
import { GameOverComponent } from './components/game-over/game-over.component';
import { DifficultyInputsActionsComponent } from './components/difficulty-inputs-actions/difficulty-inputs-actions.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TheBoardComponent,
    TheDotsComponent,
    GameOverComponent,
    DifficultyInputsActionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
