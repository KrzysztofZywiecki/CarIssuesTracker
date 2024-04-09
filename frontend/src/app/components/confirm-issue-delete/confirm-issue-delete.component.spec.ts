import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmIssueDeleteComponent } from './confirm-issue-delete.component';

describe('ConfirmIssueDeleteComponent', () => {
  let component: ConfirmIssueDeleteComponent;
  let fixture: ComponentFixture<ConfirmIssueDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmIssueDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmIssueDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
