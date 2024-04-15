import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCarDialogComponent } from './add-new-car-dialog.component';

describe('AddNewCarDialogComponent', () => {
  let component: AddNewCarDialogComponent;
  let fixture: ComponentFixture<AddNewCarDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewCarDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNewCarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
