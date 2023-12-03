import  {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CdTimerComponent, TimeInterface} from 'angular-cd-timer';
import { Observable, Subscription, interval } from 'rxjs';
import * as Tone from 'tone';

@Component({
  selector: 'app-prep-speech',
  templateUrl: './prep-speech.component.html',
  styleUrl: './prep-speech.component.css'
})
export class PrepSpeechComponent implements OnInit , OnDestroy {
  @ViewChild('prepTimer', { static: true })
  prepTimer!: CdTimerComponent;

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
          //this.timervalue = this.prepTimer.get().seconds;
          this.timervalue = this.prepTimer.get().tick_count ;
          console.log('this.timervalue prep speech '+this.timervalue+"  -  " + this.prepTimer.get().tick_count );
    
          if (this.timervalue < 2) {
            document.body.style.backgroundColor= '#808080';  //grey
          }   else if (this.timervalue >= 4 && this.timervalue <  8 ) {
            document.body.style.backgroundColor= '#008000';  //green
          }   else if (this.timervalue >= 8 && this.timervalue <  12) {
            document.body.style.backgroundColor= '#FFBF00';  //amber
          } else if (this.timervalue >= 12   ) {
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
    console.log('Timer onStop.' +this.prepTimer.get().seconds);
    //this.prepTimer.get();
  }

  doActionprepTimer(action: String) {
    console.log('doActionprepTimer' +this.prepTimer.get().seconds);
    //const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
   // document.body.style.backgroundColor = randomColor;
    switch (action) {
      case 'start':
        this.prepTimer.start();
        this.bellSounded=false;
        break;
      case 'resume':
        this.prepTimer.resume();
        break;
      case 'reset':
        this.prepTimer.reset();
        this.bellSounded=false;
        break;
      default:
        this.prepTimer.stop();
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
