import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.scss'],
  standalone: false, // Explicitly set to false
})
export class UserSignupComponent implements OnInit {
  public signupForm: FormGroup;
  public loading = false;
  public error = '';

  /**
   * Constructs the signup component.
   * Redirects to the employees list if the user is already logged in.
   *
   * @param formBuilder - Service to build reactive forms.
   * @param router - Service for navigation.
   * @param authService - Service handling user authentication.
   */
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    // Redirect to employees if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/employees']);
    }
  }

  /**
   * Lifecycle hook called after the component has been initialized.
   * Sets up the signup form with validation, including a custom password match validator.
   */
  public ngOnInit(): void {
    this.initializeSignupForm();
  }

  /**
   * Initializes the signup form with validators.
   */
  private initializeSignupForm(): void {
    this.signupForm = this.formBuilder.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: this.mustMatchValidator('password', 'confirmPassword'),
      }
    );
  }

  /**
   * Convenience getter for easy access to form controls.
   */
  public get formControls() {
    return this.signupForm.controls;
  }

  /**
   * Custom validator to ensure two fields match.
   * Returns a validator function to be used in the form group.
   *
   * @param controlName - The key for the main control.
   * @param matchingControlName - The key for the control to match against.
   * @returns A validator function that sets errors on the matching control if the values do not match.
   */
  private mustMatchValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup): void => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      // Exit if another validator has found an error on matchingControl.
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      // Set error on matchingControl if validation fails, otherwise clear error.
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  /**
   * Handles the signup form submission.
   * If the form is valid, calls the signup method on the AuthService and navigates to the employees list.
   */
  public onSubmit(): void {
    // Stop submission if form is invalid.
    if (this.signupForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService
      .signup(
        this.formControls['username'].value,
        this.formControls['email'].value,
        this.formControls['password'].value
      )
      .subscribe({
        next: () => this.router.navigate(['/employees']),
        error: (err) => {
          this.error = err?.message || 'Signup failed. Please try again.';
          this.loading = false;
        },
      });
  }
}
