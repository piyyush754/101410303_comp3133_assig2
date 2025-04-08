import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeDirectoryComponent } from './employee-directory.component';

describe('EmployeeDirectoryComponent', () => {
  let fixture: ComponentFixture<EmployeeDirectoryComponent>;
  let component: EmployeeDirectoryComponent;

  // Configure the testing module asynchronously.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeDirectoryComponent]
    }).compileComponents();
  });

  // Create the component instance and trigger initial change detection.
  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should instantiate the component', () => {
    expect(component).toBeTruthy();
  });
});
