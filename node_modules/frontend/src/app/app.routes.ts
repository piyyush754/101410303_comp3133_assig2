import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { AuthGuard } from './guards/auth.guard'; // Optional if you're using route protection

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'employees',
    component: EmployeeListComponent,
    canActivate: [AuthGuard], // Optional protection
  },
  {
    path: 'add-employee',
    component: AddEmployeeComponent,
    canActivate: [AuthGuard], // Optional protection
  },
  {
    path: 'employee/:id',
    component: EmployeeDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-employee/:id',
    component: UpdateEmployeeComponent,
    canActivate: [AuthGuard],
  },
  // Catch-all fallback route
  { path: '**', redirectTo: 'login' },
];
