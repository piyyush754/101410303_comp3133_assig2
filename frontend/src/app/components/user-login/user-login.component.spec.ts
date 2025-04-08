import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserLoginComponent } from './user-login.component';

describe('UserLoginComponent', () => {
  let fixture: ComponentFixture<UserLoginComponent>;
  let component: UserLoginComponent;

  // Configure the TestBed module asynchronously and compile the components.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLoginComponent]
    }).compileComponents();
  });

  // Create the component instance and run initial change detection.
  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should instantiate the component', () => {
    expect(component).toBeTruthy();
  });
});
