import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepSpeechComponent } from './prep-speech.component';

describe('PrepSpeechComponent', () => {
  let component: PrepSpeechComponent;
  let fixture: ComponentFixture<PrepSpeechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrepSpeechComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrepSpeechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
