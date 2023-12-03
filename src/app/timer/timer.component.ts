import  {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CdTimerComponent, TimeInterface} from 'angular-cd-timer';
import { Subscription, interval } from 'rxjs';
 
import * as Tone from 'tone';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent implements OnInit,OnDestroy{
  @ViewChild('basicTimer', { static: true })
  basicTimer!: CdTimerComponent;

  timerInfo = '';
  timervalue:number=0;
  bellSounded:boolean =false;
  timerSubscription: Subscription = new Subscription;  

  constructor() {
    this.timerInfo = '';
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

  ngOnInit(): void {
    console.log('ngOnInit'+this.timerInfo);
        // Use RxJS interval to periodically check the timer value
        this.timerSubscription = interval(1000).subscribe(() => {
          // Assume fetchTimerValue is a method to get the timer value from the third-party component
          //this.timervalue = this.basicTimer.get().seconds;
          this.timervalue = this.basicTimer.get().tick_count ;
          console.log('this.timervalue round robin '+this.timervalue+"  -  " + this.basicTimer.get().tick_count );
          // Add logic to determine the background color based on the timerValue
          if (this.timervalue < 20) {
            document.body.style.backgroundColor= '#808080';  //grey
          }   else if (this.timervalue >= 20  ) {
            document.body.style.backgroundColor= '#ff0000';  //red
            if(this.bellSounded==false){
              this.playBell();
              this.bellSounded=true;
          }
        
          
          } 
        });
    
        // Don't forget to unsubscribe to prevent memory leaks when the component is destroyed
        // You might want to handle this in ngOnDestroy lifecycle hook
        // For simplicity, we'll just unsubscribe in 10 seconds
        setTimeout(() => {
          this.timerSubscription.unsubscribe();
        }, 10000000); 
  }

 

  onComplete(data: any) {
    this.timerInfo = 'Finished !';
    console.log('complete'+this.timerInfo);
  }

  onTick(data: TimeInterface) {
    this.timerInfo = 'In Progress [' + data.tick_count.toString().padStart(4, '0') + ']';
    console.log('Ton tick'+this.timerInfo);
  }

  onStart(data: any) {
    console.log('Timer started.');
  }

  onStop(data: any) {
    console.log('Timer onStop.' +this.basicTimer.get().seconds);
    //this.basicTimer.get();
  }

  doActionBasicTimer(action: String) {
    console.log('doActionBasicTimer' +this.basicTimer.get().seconds);
    switch (action) {
      case 'start':
        this.basicTimer.start();
        this.bellSounded=false;
        break;
      case 'resume':
        this.basicTimer.resume();
        break;
      case 'reset':
        this.basicTimer.reset();
        this.bellSounded=false;
        break;
      default:
        this.basicTimer.stop();
        //this.timervalue=0;
       // this.bellSounded=false;
        break;
    }
  }

  public playBell(){
    console.log('palybell')
    //const player = new Tone.Player("https://tonejs.github.io/audio/berklee/gong_1.mp3").toDestination();
    const player = new Tone.Player("./assets/Quick-beep-sound-effect.mp3").toDestination();
    Tone.loaded().then(() => {
      player.start();
});

}

}
