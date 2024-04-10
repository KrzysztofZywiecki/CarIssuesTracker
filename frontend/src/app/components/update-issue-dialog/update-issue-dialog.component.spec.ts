import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIssueDialogComponent } from './update-issue-dialog.component';

describe('UpdateIssueDialogComponent', () => {
  let component: UpdateIssueDialogComponent;
  let fixture: ComponentFixture<UpdateIssueDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateIssueDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateIssueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
