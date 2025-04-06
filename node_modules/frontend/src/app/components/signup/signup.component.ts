import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: false, // Explicitly set to false
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    // redirect to employees if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/employees']);
    }
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: this.mustMatch('password', 'confirmPassword'),
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.signupForm.controls;
  }

  // custom validator to check that two fields match
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onSubmit(): void {
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService
      .signup(this.f.username.value, this.f.email.value, this.f.password.value)
      .subscribe(
        () => {
          this.router.navigate(['/employees']);
        },
        (error) => {
          this.error = error?.message || 'Signup failed. Please try again.';
          this.loading = false;
        }
      );
  }
}
