import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeProfileComponent } from './employee-profile.component';

describe('EmployeeProfileComponent', () => {
  let fixture: ComponentFixture<EmployeeProfileComponent>;
  let component: EmployeeProfileComponent;

  // Asynchronously configure the testing module and compile components.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeProfileComponent]
    }).compileComponents();
  });

  // Synchronously create the component instance before each test.
  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should instantiate the component', () => {
    expect(component).toBeTruthy();
  });
});
