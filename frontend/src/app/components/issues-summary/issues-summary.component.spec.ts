import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesSummaryComponent } from './issues-summary.component';

describe('IssuesSummaryComponent', () => {
  let component: IssuesSummaryComponent;
  let fixture: ComponentFixture<IssuesSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssuesSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IssuesSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
