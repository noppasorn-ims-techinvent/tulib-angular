import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AppState } from '../../app-state';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../components/input/input.component';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { ButtonComponent } from '../../components/button/button.component';
import Swal from 'sweetalert2';
import { DropDownOption } from '../../interface/base/option';
import { PrefixOption } from '../../../constant/dropdown';
import { UserDetail } from '../../interface/auth/user-detail';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    DropdownComponent,
    ButtonComponent,
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent implements OnInit {
  options: DropDownOption[] = [];
  profileDetail!: UserDetail;
  form: FormGroup = new FormGroup({});

  constructor(
    private appState: AppState,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.appState.setPageCurrent('edit-profile');
    this.options = PrefixOption;
    this.form = new FormGroup({
      prefix: new FormControl<string>('', Validators.required),
      firstName: new FormControl<string>('', Validators.required),
      lastName: new FormControl<string>('', Validators.required),
      telephone: new FormControl<string>(''),
    });
  }

  getFormControlByKey(key: string) {
    return this.form.get(key) as FormControl;
  }

  onSubmit(): void {
    console.log(this.form);
    this.authService
      .register({
        prefix: this.form.get('prefix')?.value,
        firstName: this.form.get('firstName')?.value,
        lastName: this.form.get('lastName')?.value,
        telephone:
          this.form.get('telephone')?.value != ''
            ? this.form.get('telephone')?.value
            : null,
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value,
      })
      .subscribe((response) => {
        console.log(response);

        if (response.isSuccess) {
          Swal.fire({
            title: 'ลงทะเบียนสำเร็จ',
            text: 'กรุณาตรวจสอบอีเมลของท่านเพื่อเข้าสู่ระบบ',
            icon: 'success',
            showConfirmButton: true,
          }).then((result) => {
            if (result['isConfirmed']) {
              this.router.navigate(['/login']);
            }
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'ลงทะเบียนไม่สำเร็จ',
            text: response.message,
            showConfirmButton: true,
          });
        }
      });
  }
}
