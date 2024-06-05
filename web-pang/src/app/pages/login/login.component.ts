import { Component, OnInit, inject } from '@angular/core';
import { InputNormalComponent } from '../../components/input-normal/input-normal.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { InputPasswordComponent } from '../../components/input-password/input-password.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputNormalComponent,ReactiveFormsModule,MatInputModule,MatIconModule,InputPasswordComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  authService = inject(AuthService);
  router = inject(Router);
  loginForm: FormGroup;
  fb = inject(FormBuilder);

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required]],
      password: ['',[Validators.required]]
    })
  }

  login(){
    this.authService.login(this.loginForm.value).subscribe({
      next:(response) => {
        Swal.fire({
          title: 'Success!',
          text: response.message,
          icon: "success",
          confirmButtonText: "Submit",
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/'])
          }
        })
      },
      error:(error) => {
        Swal.fire({
          title: 'Fail!',
          text: error.error.message,
          icon: "error",
          confirmButtonText: "Submit",
        })
      }
    })
  }

  getKey(string:string){
    return this.loginForm.get(string) as FormControl;
  }

}
