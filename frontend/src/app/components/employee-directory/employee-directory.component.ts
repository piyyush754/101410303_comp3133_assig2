import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-employee-directory',
  templateUrl: './employee-directory.component.html',
  styleUrls: ['./employee-directory.component.scss'],
  standalone: false, // Explicitly set to false
})
export class EmployeeDirectoryComponent implements OnInit {
  public employees: any[] = [];
  public filteredEmployees: any[] = [];
  public loading = false;
  public error = '';
  public searchForm: FormGroup;
  public departments: string[] = [];
  public designations: string[] = [];

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   * It sets up the search form and loads the employee data.
   */
  public ngOnInit(): void {
    this.initializeSearchForm();
    this.loadEmployees();
  }

  /**
   * Initializes the search form with default values.
   */
  private initializeSearchForm(): void {
    this.searchForm = this.formBuilder.group({
      department: [''],
      designation: [''],
    });
  }

  /**
   * Loads all employees and initializes filter options.
   * Sets loading states and handles error messaging.
   */
  public loadEmployees(): void {
    this.loading = true;
    this.employeeService.getAllEmployees().subscribe(
      (data) => {
        this.employees = data;
        this.filteredEmployees = data;
        this.extractFilters();
        this.loading = false;
      },
      (error) => {
        this.error = error?.message || 'Error loading employees.';
        this.loading = false;
      }
    );
  }

  /**
   * Extracts unique departments and designations from the loaded employee data.
   */
  private extractFilters(): void {
    this.departments = [...new Set(this.employees.map((emp) => emp.department))];
    this.designations = [...new Set(this.employees.map((emp) => emp.designation))];
  }

  /**
   * Executes the search based on selected department and designation.
   * If search criteria are empty, it resets the filtered list to show all employees.
   */
  public onSearch(): void {
    const department = this.searchForm.get('department')?.value;
    const designation = this.searchForm.get('designation')?.value;

    if (department || designation) {
      this.loading = true;
      this.employeeService.searchEmployees(department, designation).subscribe(
        (data) => {
          this.filteredEmployees = data;
          this.loading = false;
        },
        (error) => {
          this.error = error?.message || 'Error searching employees.';
          this.loading = false;
        }
      );
    } else {
      this.filteredEmployees = this.employees;
    }
  }

  /**
   * Resets the search form and displays all employees.
   */
  public resetSearch(): void {
    this.searchForm.reset();
    this.filteredEmployees = this.employees;
  }

  /**
   * Navigates to the employee detail view.
   * 
   * @param id - The unique identifier of the employee.
   */
  public viewEmployee(id: string): void {
    this.router.navigate(['/employee', id]);
  }

  /**
   * Navigates to the edit view for the selected employee.
   * 
   * @param id - The unique identifier of the employee.
   */
  public editEmployee(id: string): void {
    this.router.navigate(['/update-employee', id]);
  }

  /**
   * Initiates the employee deletion workflow.
   * If confirmed, it deletes the employee and reloads the employee list.
   * 
   * @param id - The unique identifier of the employee.
   */
  public deleteEmployee(id: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.loading = true;
      this.employeeService.deleteEmployee(id).subscribe(
        () => this.loadEmployees(),
        (error) => {
          this.error = error?.message || 'Error deleting employee.';
          this.loading = false;
        }
      );
    }
  }

  /**
   * Navigates to the add employee view.
   */
  public addEmployee(): void {
    this.router.navigate(['/add-employee']);
  }

  /**
   * Logs out the current user using the authentication service.
   */
  public logout(): void {
    this.authService.logout();
  }

  /**
   * Formats a date string into a more human-readable format.
   * 
   * @param dateString - The original date string.
   * @returns A localized date string.
   */
  public formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}
