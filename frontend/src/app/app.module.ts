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
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';

// Services
import { AuthService } from './services/auth.service';
import { EmployeeService } from './services/employee.service';

// Guards
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    EmployeeListComponent,
    AddEmployeeComponent,
    EmployeeDetailsComponent,
    UpdateEmployeeComponent,
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
