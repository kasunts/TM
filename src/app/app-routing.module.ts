import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TimerComponent } from './timer/timer.component';
import { PrepSpeechComponent } from './prep-speech/prep-speech.component';

const routes: Routes = [ 
  {path: 'app-timer', component: TimerComponent},
  {path: 'app-prep-speech', component: PrepSpeechComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
