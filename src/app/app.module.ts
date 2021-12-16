import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { TheBoardComponent } from './components/the-board/the-board.component';
import { TheDotsComponent } from './components/the-dots/the-dots.component';
import { GameOverComponent } from './components/game-over/game-over.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TheBoardComponent,
    TheDotsComponent,
    GameOverComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
