import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryPlotComponent } from './summary-plot.component';

describe('SummaryPlotComponent', () => {
  let component: SummaryPlotComponent;
  let fixture: ComponentFixture<SummaryPlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryPlotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SummaryPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
