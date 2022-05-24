import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartUpResultsComponent } from './start-up-results.component';

describe('StartUpResultsComponent', () => {
  let component: StartUpResultsComponent;
  let fixture: ComponentFixture<StartUpResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartUpResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartUpResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
