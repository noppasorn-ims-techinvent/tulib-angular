import { Component, OnInit, inject } from '@angular/core';
import { InputComponent } from '../../component/input/input.component';
import { InputPasswordComponent } from '../../component/input-password/input-password.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../component/button/button.component';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputComponent,InputPasswordComponent,FormsModule,ButtonComponent,ReactiveFormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  authService = inject(AuthService);
  loginForm: FormGroup;
  fb = inject(FormBuilder);

  getKey(string:string){
    return this.loginForm.get(string) as FormControl;
  }

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe((response) => {
      console.log(response)
    })
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  submitForm() {
    if (this.loginForm.valid) {
      this.login();
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
