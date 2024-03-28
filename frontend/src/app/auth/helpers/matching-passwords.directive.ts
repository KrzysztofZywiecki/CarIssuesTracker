import { Directive, ElementRef, Input } from "@angular/core";
import {
  AbstractControl,
  NG_VALIDATORS,
  NgModel,
  ValidationErrors,
  Validator,
} from "@angular/forms";

@Directive({
  selector: "[matchingPasswords]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MatchingPasswordsDirective,
      multi: true,
    },
  ],
  standalone: true,
})
export class MatchingPasswordsDirective implements Validator {
  constructor() {}

  @Input("passwordField") passwordField: NgModel | null = null;

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.passwordField?.model !== control.value
      ? { notMatching: true }
      : null;
  }
}
