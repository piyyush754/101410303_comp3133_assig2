import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss'],
  standalone: false, // Explicitly set to false
})
export class EmployeeCreateComponent implements OnInit {
  public employeeForm: FormGroup;
  public loading = false;
  public error = '';
  public photoPreview: string | null = null;

  public departments: string[] = [
    'Engineering',
    'Marketing',
    'HR',
    'Sales',
    'Finance',
    'Operations',
    'IT',
    'Customer Support',
  ];

  public designations: string[] = [
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

  /**
   * Lifecycle hook that initializes the component.
   */
  public ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * Initializes the employee form with validation rules.
   */
  private initializeForm(): void {
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

  /**
   * Convenience getter for easy access to form controls.
   */
  public get formControls() {
    return this.employeeForm.controls;
  }

  /**
   * Handles file input change events.
   * Reads the selected file and updates the photo preview and form value.
   * 
   * @param event - The file input change event.
   */
  public onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files ? inputElement.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result as string;
        this.photoPreview = result;
        this.employeeForm.patchValue({ employee_photo: result });
      };
      reader.readAsDataURL(file);
    }
  }

  /**
   * Handles form submission.
   * If the form is valid, it submits the employee data,
   * and navigates to the employees list on success.
   */
  public onSubmit(): void {
    if (this.employeeForm.invalid) {
      return;
    }
    this.setLoading(true);
    this.error = '';

    this.employeeService.addEmployee(this.employeeForm.value).subscribe(
      () => this.router.navigate(['/employees']),
      (err) => {
        this.error = err?.message || 'Error creating employee.';
        this.setLoading(false);
      }
    );
  }

  /**
   * Cancels the form submission and navigates back to the employees list.
   */
  public cancel(): void {
    this.router.navigate(['/employees']);
  }

  /**
   * Sets the loading state.
   *
   * @param isLoading - A boolean that determines if loading is active.
   */
  private setLoading(isLoading: boolean): void {
    this.loading = isLoading;
  }
}
