import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteSecureComponent } from './confirm-delete-secure.component';

describe('ConfirmDeleteSecureComponent', () => {
  let component: ConfirmDeleteSecureComponent;
  let fixture: ComponentFixture<ConfirmDeleteSecureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDeleteSecureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmDeleteSecureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
