import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePublicStarupComponent } from './create-public-starup.component';

describe('CreatePublicStarupComponent', () => {
  let component: CreatePublicStarupComponent;
  let fixture: ComponentFixture<CreatePublicStarupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePublicStarupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePublicStarupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
