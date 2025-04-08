import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss'],
  standalone: false, // Explicitly set to false
})
export class EmployeeProfileComponent implements OnInit {
  public employee: any = null;
  public loading = false;
  public error = '';
  public employeeId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   * Retrieves the employee ID from the route and loads the details.
   */
  public ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id') as string;
    this.loadEmployeeDetails();
  }

  /**
   * Loads the employee details based on the employee ID.
   * Sets the loading flag and handles errors if they occur.
   */
  private loadEmployeeDetails(): void {
    this.loading = true;
    this.employeeService.getEmployeeById(this.employeeId).subscribe(
      (data) => {
        this.employee = data;
        this.loading = false;
      },
      (error) => {
        this.error = error?.message || 'Error loading employee details.';
        this.loading = false;
      }
    );
  }

  /**
   * Navigates to the employee update view for editing.
   */
  public editEmployee(): void {
    this.router.navigate(['/update-employee', this.employeeId]);
  }

  /**
   * Deletes the current employee after confirmation and navigates back to the employee list.
   */
  public deleteEmployee(): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.loading = true;
      this.employeeService.deleteEmployee(this.employeeId).subscribe(
        () => {
          this.router.navigate(['/employees']);
        },
        (error) => {
          this.error = error?.message || 'Error deleting employee.';
          this.loading = false;
        }
      );
    }
  }

  /**
   * Navigates back to the employee list view.
   */
  public goBack(): void {
    this.router.navigate(['/employees']);
  }

  /**
   * Formats a date string into a localized date format.
   *
   * @param dateString - The ISO date string to format.
   * @returns The formatted local date string.
   */
  public formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}
