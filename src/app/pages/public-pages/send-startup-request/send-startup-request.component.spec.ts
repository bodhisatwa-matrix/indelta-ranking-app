import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendStartupRequestComponent } from './send-startup-request.component';

describe('SendStartupRequestComponent', () => {
  let component: SendStartupRequestComponent;
  let fixture: ComponentFixture<SendStartupRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendStartupRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendStartupRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
