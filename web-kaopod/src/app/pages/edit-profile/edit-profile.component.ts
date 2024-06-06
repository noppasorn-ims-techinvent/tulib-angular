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
import { subscribe } from 'node:diagnostics_channel';

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
  profileDetail: UserDetail | undefined;
  form: FormGroup = new FormGroup({});

  constructor(
    private appState: AppState,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getDetail().subscribe(
      (d) => {
        this.profileDetail = d;
        this.initializeForm();
      }
    );
  

    this.appState.setPageCurrent('edit-profile');
    this.options = PrefixOption;
  }
  
  initializeForm() {
    this.form = new FormGroup({
      prefix: new FormControl<string>(this.profileDetail!.prefix, Validators.required),
      firstName: new FormControl<string>(this.profileDetail!.firstName, Validators.required),
      lastName: new FormControl<string>(this.profileDetail!.lastName, Validators.required),
      telephone: new FormControl<string>(this.profileDetail!.telephone),
    });
    console.log(this.profileDetail?.prefix);
    
  }
  

  getFormControlByKey(key: string) {
    return this.form.get(key) as FormControl;
  }

  onSubmit(): void {
    console.log(this.form);
    this.authService
      .update({
        prefix: this.form.get('prefix')?.value,
        firstName: this.form.get('firstName')?.value,
        lastName: this.form.get('lastName')?.value,
        telephone:
          this.form.get('telephone')?.value != ''
            ? this.form.get('telephone')?.value
            : null
      })
      .subscribe((response) => {
        console.log(response);

        if (response.isSuccess) {
          Swal.fire({
            title: 'แก้ไขสำเร็จ',
            text: response.message,
            icon: 'success',
            showConfirmButton: false,
            timer:2000
          })
          .then((result) => {
            console.log(result);
            
            if (result.dismiss === Swal.DismissReason.timer) {
              this.authService.getDetail()
            }
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'แก้ไขไม่สำเร็จ',
            text: response.message,
            showConfirmButton: true,
          });
        }
      });
  }
}
