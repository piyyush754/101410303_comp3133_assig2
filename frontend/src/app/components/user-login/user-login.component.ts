import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
  standalone: false, // Explicitly set to false
})
export class UserLoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public loading = false;
  public error = '';
  public returnUrl!: string;

  /**
   * Constructs the login component.
   * If the user is already logged in, they are redirected to the employee list.
   *
   * @param formBuilder - Form builder to build the reactive form.
   * @param router - Angular router for navigation.
   * @param route - Current activated route.
   * @param authService - Authentication service for login and session handling.
   */
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    // Redirect to employees list if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/employees']);
    }
  }

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   * Sets up the login form and initializes the return URL.
   */
  public ngOnInit(): void {
    this.initializeLoginForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/employees';
  }

  /**
   * Initializes the login form with required validators.
   */
  private initializeLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      usernameOrEmail: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * Convenience getter for easy access to login form controls.
   */
  public get formControls() {
    return this.loginForm.controls;
  }

  /**
   * Handles the submission of the login form.
   * If the form is valid, it attempts to log in using the provided credentials.
   * On success, navigates to the return URL; otherwise, displays an error message.
   */
  public onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    // Attempt to log in with the provided username/email and password
    this.authService
      .login(this.formControls['usernameOrEmail'].value, this.formControls['password'].value)
      .subscribe({
        next: () => {
          this.router.navigate([this.returnUrl]);
        },
        error: (err) => {
          this.error = err?.message || 'Login failed. Please check your credentials.';
          this.loading = false;
        },
      });
  }
}
