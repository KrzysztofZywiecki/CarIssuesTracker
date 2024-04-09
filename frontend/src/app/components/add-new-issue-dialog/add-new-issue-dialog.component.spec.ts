import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewIssueDialogComponent } from './add-new-issue-dialog.component';

describe('AddNewIssueDialogComponent', () => {
  let component: AddNewIssueDialogComponent;
  let fixture: ComponentFixture<AddNewIssueDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewIssueDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNewIssueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
