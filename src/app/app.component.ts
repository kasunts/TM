import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TM';

  showComponentA: boolean = false;

  toggleComponents(): void {
    this.showComponentA = !this.showComponentA;
  }
}
