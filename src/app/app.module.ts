import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { TheBoardComponent } from './components/the-board/the-board.component';
import { TheDotComponent } from './components/the-dot/the-dot.component';

@NgModule({
  declarations: [AppComponent, MainComponent, TheBoardComponent, TheDotComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
