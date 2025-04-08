import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.scss'],
  standalone: false, // Explicitly set to false
})
export class EmployeeUpdateComponent implements OnInit {
  public employeeForm: FormGroup;
  public loading = false;
  public loadingEmployee = false;
  public error = '';
  public employeeId: string;
  public photoPreview: string | null = null;

  // Available departments.
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

  // Available designations.
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
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  /**
   * Lifecycle hook that initializes the component.
   * Retrieves the employee ID from the route, initializes the form, and loads the employee data.
   */
  public ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id') as string;
    this.initializeForm();
    this.loadEmployeeData();
  }

  /**
   * Convenience getter for easy access to form controls.
   */
  public get formControls() {
    return this.employeeForm.controls;
  }

  /**
   * Initializes the employee update form with validation rules.
   */
  private initializeForm(): void {
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
  }

  /**
   * Loads employee data by calling the EmployeeService.
   * Patches the form with the retrieved values and sets up the photo preview.
   */
  public loadEmployeeData(): void {
    this.loadingEmployee = true;
    this.employeeService.getEmployeeById(this.employeeId).subscribe(
      (employee) => {
        const formattedDate = this.formatJoiningDate(employee.date_of_joining);
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

  /**
   * Formats the joining date into a YYYY-MM-DD string for the date picker.
   *
   * @param dateString - The original joining date string.
   * @returns A formatted date string or an empty string if invalid.
   */
  private formatJoiningDate(dateString: string): string {
    let formattedDate = '';
    if (dateString) {
      const joiningDate = new Date(dateString);
      if (!isNaN(joiningDate.getTime())) {
        formattedDate = joiningDate.toISOString().split('T')[0];
      }
    }
    return formattedDate;
  }

  /**
   * Handles changes in the file input.
   * Reads the selected file and updates the photo preview and form control.
   *
   * @param event - The file input change event.
   */
  public onFileChange(event: any): void {
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

  /**
   * Submits the updated employee data if the form is valid.
   * Navigates back to the employee list upon success.
   */
  public onSubmit(): void {
    if (this.employeeForm.invalid) {
      return;
    }
    this.loading = true;
    this.error = '';
    this.employeeService.updateEmployee(this.employeeId, this.employeeForm.value)
      .subscribe(
        () => this.router.navigate(['/employees']),
        (error) => {
          this.error = error?.message || 'Error updating employee.';
          this.loading = false;
        }
      );
  }

  /**
   * Cancels the update process and navigates back to the employee list.
   */
  public cancel(): void {
    this.router.navigate(['/employees']);
  }
}
