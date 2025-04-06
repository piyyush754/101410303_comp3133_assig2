import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss'],
  standalone: false, // Explicitly set to false
})
export class UpdateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  loading = false;
  loadingEmployee = false;
  error = '';
  employeeId: string;
  photoPreview: string | null = null;

  departments = [
    'Engineering',
    'Marketing',
    'HR',
    'Sales',
    'Finance',
    'Operations',
    'IT',
    'Customer Support',
  ];

  designations = [
    'Software Engineer',
    'Senior Developer',
    'Project Manager',
    'UX Designer',
    'Marketing Specialist',
    'HR Manager',
    'Sales Representative',
    'Financial Analyst',
    'Operations Manager',
    'IT Specialist',
    'Customer Support Agent',
    'Team Lead',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id') as string;

    this.employeeForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      designation: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(1000)]],
      date_of_joining: ['', Validators.required],
      department: ['', Validators.required],
      employee_photo: [''],
    });

    this.loadEmployeeData();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.employeeForm.controls;
  }

  loadEmployeeData(): void {
    this.loadingEmployee = true;
    this.employeeService.getEmployeeById(this.employeeId).subscribe(
      (employee) => {
        // Format date for proper display in date picker
        let formattedDate = '';
        if (employee.date_of_joining) {
          const joiningDate = new Date(employee.date_of_joining);
          if (!isNaN(joiningDate.getTime())) {
            formattedDate = joiningDate.toISOString().split('T')[0];
          }
        }

        this.employeeForm.patchValue({
          first_name: employee.first_name,
          last_name: employee.last_name,
          email: employee.email,
          gender: employee.gender,
          designation: employee.designation,
          salary: employee.salary,
          date_of_joining: formattedDate,
          department: employee.department,
          employee_photo: employee.employee_photo,
        });

        this.photoPreview = employee.employee_photo;
        this.loadingEmployee = false;
      },
      (error) => {
        this.error = error?.message || 'Error loading employee data.';
        this.loadingEmployee = false;
      }
    );
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.photoPreview = e.target.result;
        this.employeeForm.patchValue({
          employee_photo: e.target.result,
        });
      };

      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    // stop here if form is invalid
    if (this.employeeForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    this.employeeService
      .updateEmployee(this.employeeId, this.employeeForm.value)
      .subscribe(
        () => {
          this.router.navigate(['/employees']);
        },
        (error) => {
          this.error = error?.message || 'Error updating employee.';
          this.loading = false;
        }
      );
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }
}
