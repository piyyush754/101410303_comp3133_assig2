import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeUpdateComponent } from './employee-update.component';

describe('EmployeeUpdateComponent', () => {
  let fixture: ComponentFixture<EmployeeUpdateComponent>;
  let component: EmployeeUpdateComponent;

  // Asynchronously configure the testing module and compile components.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeUpdateComponent]
    }).compileComponents();
  });

  // Synchronously create the component instance and trigger initial change detection.
  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should instantiate the component', () => {
    expect(component).toBeTruthy();
  });
});
