import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InstrumentComponent } from './instrument/instrument.component';
import { CdTimerModule } from 'angular-cd-timer';
import { TimerComponent } from './timer/timer.component';
import { PrepSpeechComponent } from './prep-speech/prep-speech.component';


@NgModule({
  declarations: [
    AppComponent,
    InstrumentComponent,
    TimerComponent,
    PrepSpeechComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CdTimerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
