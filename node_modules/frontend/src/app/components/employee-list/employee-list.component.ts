import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  standalone: false, // Explicitly set to false
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  filteredEmployees: any[] = [];
  loading = false;
  error = '';
  searchForm: FormGroup;
  departments: string[] = [];
  designations: string[] = [];

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      department: [''],
      designation: [''],
    });

    this.loadEmployees();
  }

  loadEmployees(): void {
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

  extractFilters(): void {
    // Extract unique departments and designations for filter dropdowns
    this.departments = [
      ...new Set(this.employees.map((emp) => emp.department)),
    ];
    this.designations = [
      ...new Set(this.employees.map((emp) => emp.designation)),
    ];
  }

  onSearch(): void {
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

  resetSearch(): void {
    this.searchForm.reset();
    this.filteredEmployees = this.employees;
  }

  viewEmployee(id: string): void {
    this.router.navigate(['/employee', id]);
  }

  editEmployee(id: string): void {
    this.router.navigate(['/update-employee', id]);
  }

  deleteEmployee(id: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.loading = true;
      this.employeeService.deleteEmployee(id).subscribe(
        () => {
          this.loadEmployees();
        },
        (error) => {
          this.error = error?.message || 'Error deleting employee.';
          this.loading = false;
        }
      );
    }
  }

  addEmployee(): void {
    this.router.navigate(['/add-employee']);
  }

  logout(): void {
    this.authService.logout();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }
}
