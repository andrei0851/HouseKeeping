import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage?: string;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  submit() {
    if (this.loginForm.invalid) {
      window.alert("Invalid login form.")
    } else {
      /*this.accountService.login(this.loginForm.value).subscribe((response: any) => {
        localStorage.setItem('token', response.token);
        window.location.href = ''
      }, error => {
        this.errorMessage = error;
      });*/
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password')
  }
}
