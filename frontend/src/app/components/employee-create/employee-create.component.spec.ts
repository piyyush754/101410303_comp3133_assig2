import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeCreateComponent } from './employee-create.component';

describe('EmployeeCreateComponent', () => {
  let fixture: ComponentFixture<EmployeeCreateComponent>;
  let component: EmployeeCreateComponent;

  // Compile the component asynchronously
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeCreateComponent]
    }).compileComponents();
  });

  // Create a fresh instance of the component before each test
  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // A simple test to ensure the component instantiates correctly
  it('should instantiate the component', () => {
    expect(component).toBeTruthy();
  });
});
