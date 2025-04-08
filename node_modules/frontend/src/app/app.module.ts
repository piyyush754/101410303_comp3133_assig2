import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

// Routes
import { routes } from './app.routes'; // 👈 import your routes here

// GraphQL Module
import { GraphQLModule } from './graphql.module';

// Components
import { AppComponent } from './app.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserSignupComponent } from './components/user-signup/user-signup.component';
import { EmployeeDirectoryComponent } from './components/employee-directory/employee-directory.component';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EmployeeProfileComponent } from './components/employee-profile/employee-profile.component';
import { EmployeeUpdateComponent } from './components/employee-update/employee-update.component';

// Services
import { AuthService } from './services/auth.service';
import { EmployeeService } from './services/employee.service';

// Guards
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserSignupComponent,
    EmployeeDirectoryComponent,
    EmployeeCreateComponent,
    EmployeeProfileComponent,
    EmployeeUpdateComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), // ✅ Proper routing setup here
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    GraphQLModule,
  ],
  providers: [AuthService, EmployeeService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
