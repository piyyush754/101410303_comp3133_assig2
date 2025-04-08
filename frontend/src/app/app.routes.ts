import { Routes } from '@angular/router';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserSignupComponent } from './components/user-signup/user-signup.component';
import { EmployeeDirectoryComponent } from './components/employee-directory/employee-directory.component';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EmployeeProfileComponent } from './components/employee-profile/employee-profile.component';
import { EmployeeUpdateComponent } from './components/employee-update/employee-update.component';
import { AuthGuard } from './guards/auth.guard'; // Optional if you're using route protection

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: UserLoginComponent },
  { path: 'signup', component: UserSignupComponent },
  {
    path: 'employees',
    component: EmployeeDirectoryComponent,
    canActivate: [AuthGuard], // Optional protection
  },
  {
    path: 'add-employee',
    component: EmployeeCreateComponent,
    canActivate: [AuthGuard], // Optional protection
  },
  {
    path: 'employee/:id',
    component: EmployeeProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-employee/:id',
    component: EmployeeUpdateComponent,
    canActivate: [AuthGuard],
  },
  // Catch-all fallback route
  { path: '**', redirectTo: 'login' },
];
