import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserSignupComponent } from './user-signup.component';

describe('UserSignupComponent', () => {
  let fixture: ComponentFixture<UserSignupComponent>;
  let component: UserSignupComponent;

  // Asynchronously configure the testing module and compile components.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSignupComponent]
    }).compileComponents();
  });

  // Create the component instance and trigger initial change detection.
  beforeEach(() => {
    fixture = TestBed.createComponent(UserSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should instantiate the component', () => {
    expect(component).toBeTruthy();
  });
});
