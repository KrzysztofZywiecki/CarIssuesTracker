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
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const password = control.get("password");
    const confirmPassword = control.get("confirmPassword");
    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ notMatching: true });
      return { notMatching: true };
    } else {
      confirmPassword?.setErrors(null);
      return null;
    }
  }
}
