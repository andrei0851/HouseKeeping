import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import {AccountService} from "../../core/account.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage?: string;

  constructor(private formBuilder: FormBuilder,
              private accountService: AccountService, private router: Router) {
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
      this.accountService.login(this.loginForm.value).subscribe((response: any) => {
        if(response.member.household != null){
          localStorage.setItem('household',response.member.household.id);
        }
        localStorage.setItem('token',response.token);
        localStorage.setItem('userID',response.member.id);
       this.router.navigate(['/']).then(() => {
        window.location.reload();
       });
      }, (error: string | undefined) => {
        this.errorMessage = error;
      });
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password')
  }
}
