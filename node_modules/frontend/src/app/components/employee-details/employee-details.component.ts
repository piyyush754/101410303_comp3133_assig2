import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
  standalone: false, // Explicitly set to false
})
export class EmployeeDetailsComponent implements OnInit {
  employee: any = null;
  loading = false;
  error = '';
  employeeId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id') as string;
    this.loadEmployeeDetails();
  }

  loadEmployeeDetails(): void {
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

  editEmployee(): void {
    this.router.navigate(['/update-employee', this.employeeId]);
  }

  deleteEmployee(): void {
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

  goBack(): void {
    this.router.navigate(['/employees']);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }
}
