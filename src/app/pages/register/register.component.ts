import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {AccountService} from "../../core/account.service";

export class RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;

  constructor(
      firstName: string,
      lastName: string,
      email: string,
      password: string,
      phoneNumber: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submittedPressed = false;
  success = false;
  errorMessage!: string;

  constructor(private formBuilder: FormBuilder, private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.errorMessage = '';
  }

  createForm(): void {
    this.registerForm = this.formBuilder.group({
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      passwords: this.formBuilder.group(
          {
            password: [null, [Validators.required]],
            confPassword: [null, [Validators.required]],
          },
          {validators: this.confPasswordMatchesValidator()}
      ),
    });
  }

  confPasswordMatchesValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return control.get('password')?.value !== control.get('confPassword')?.value
          ? { confPass: true }
          : null;
    };
  }

  submit(): void {
    this.submittedPressed = true;
    if (this.registerForm.invalid){
      window.alert("Invalid register form. Please fill all the fields.")
    }

    const registerData1: RegisterData = new RegisterData(
        this.firstname?.value,
        this.lastname?.value,
        this.email?.value,
        this.password?.value,
        this.phonenumber?.value
    );

    this.accountService.register(registerData1).subscribe(
        (response: any) => {
          if (response.token) { this.success = true; }
        },
        (error: any) => {
          window.alert(error);
        }
    );
  }

  get firstname() {
    return this.registerForm.get('firstname');
  }

  get phonenumber() {
    return this.registerForm.get('phonenumber');
  }

  get lastname() {
    return this.registerForm.get('lastname');
  }


  get email() {
    return this.registerForm.get('email');
  }

  get passwords() {
    return this.registerForm.get('passwords');
  }

  get password() {
    return this.registerForm.get('passwords')?.get('password');
  }

  get confPassword() {
    return this.registerForm.get('passwords')?.get('confPassword');
  }
}