import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app-state';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { InputPasswordComponent } from '../../components/input-password/input-password.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, ButtonComponent,InputPasswordComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(
    private appState: AppState,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.appState.setPageCurrent('login');
    // this.appState
    //   .getHeaderHeightCurrent()
    //   .subscribe((h) => (this.topBarHeight = h));
    this.form = new FormGroup({
      email: new FormControl<string>('', [Validators.required,Validators.email]),
      password: new FormControl<string>('', Validators.required),
    });
  }

  getFormControlByKey(key: string) {
    return this.form.get(key) as FormControl;
  }

  onSubmit(): void {
    console.log(this.form);
    this.authService.login({
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value

    }).subscribe((response) => { 
      console.log(response);
      
      if(response.isSuccess){
          Swal.fire({
          title: 'เข้าสู่ระบบสำเร็จ',
          // text: 'กรุณาตรวจสอบอีเมลของท่านเพื่อเข้าสู่ระบบ',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
        })
        .then((result) => {
         
          if (result.dismiss === Swal.DismissReason.timer) {
            this.router.navigate(['/home']);
          }
        })
      }else{
        Swal.fire({
          icon: "error",
          title: "เข้าสู่ระบบไม่สำเร็จ",
          text:response.message,
          showConfirmButton: true,
        });
      }
    })
  }
}
