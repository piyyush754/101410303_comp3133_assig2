import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserSignupComponent } from './components/user-signup/user-signup.component';
import { EmployeeDirectoryComponent } from './components/employee-directory/employee-directory.component';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EmployeeProfileComponent } from './components/employee-profile/employee-profile.component';
import { EmployeeUpdateComponent } from './components/employee-update/employee-update.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: UserLoginComponent },
  { path: 'signup', component: UserSignupComponent },
  {
    path: 'employees',
    component: EmployeeDirectoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-employee',
    component: EmployeeCreateComponent,
    canActivate: [AuthGuard],
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
  { path: '', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
