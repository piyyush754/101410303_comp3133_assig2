import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
  standalone: false, // Explicitly set to false
})
export class AddEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  loading = false;
  error = '';
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
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['Male', Validators.required],
      designation: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(1000)]],
      date_of_joining: ['', Validators.required],
      department: ['', Validators.required],
      employee_photo: [''],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.employeeForm.controls;
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

    this.employeeService.addEmployee(this.employeeForm.value).subscribe(
      () => {
        this.router.navigate(['/employees']);
      },
      (error) => {
        this.error = error?.message || 'Error creating employee.';
        this.loading = false;
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }
}
