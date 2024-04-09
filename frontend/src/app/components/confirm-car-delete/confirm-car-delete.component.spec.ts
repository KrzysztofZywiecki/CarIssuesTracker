import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ConfirmCarDeleteComponent } from "./confirm-car-delete.component";

describe("ConfirmDeleteComponent", () => {
  let component: ConfirmCarDeleteComponent;
  let fixture: ComponentFixture<ConfirmCarDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmCarDeleteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmCarDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
