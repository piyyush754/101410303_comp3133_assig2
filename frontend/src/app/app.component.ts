import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false, // Explicitly set to false
  // Remove any standalone: true property
})
export class AppComponent {
  title = 'Employee Management System';

  constructor(private authService: AuthService) {
    console.log('AppComponent initialized');
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
  }
}
