import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { TheDotComponent } from './components/the-dot/the-dot.component';
import { TheBoardComponent } from './components/the-board/the-board.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TheDotComponent,
    TheBoardComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
