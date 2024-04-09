import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarIssuesComponent } from './car-issues.component';

describe('CarIssuesComponent', () => {
  let component: CarIssuesComponent;
  let fixture: ComponentFixture<CarIssuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarIssuesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
