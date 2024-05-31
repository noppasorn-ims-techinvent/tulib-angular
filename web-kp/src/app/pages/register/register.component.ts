import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app-state';
import { InputComponent } from '../../components/input/input.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PrefixNot } from '@angular/compiler';
import { ButtonComponent } from '../../components/button/button.component';
import { CheckboxComponent } from '../../components/checkbox/checkbox.component';
import { InputPasswordComponent } from '../../components/input-password/input-password.component';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { Option } from '../../interface/base/option';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    CheckboxComponent,
    InputPasswordComponent,
    DropdownComponent,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  topBarHeight: number = 0;  
  passwordErrorMessage : string = 'กรุณากรอกรหัสผ่านให้ตรงกัน';
  confirmPasswordErrorMessage : string = 'กรุณายืนยันรหัสผ่าน';  

  form: FormGroup = new FormGroup({});

  options: Option[] = [
    {
      text: 'นางสาว',
      value: 'นางสาว',
    },
    {
      text: 'นาง',
      value: 'นาง',
    },
    {
      text: 'นาย',
      value: 'นาย',
    },
  ];
  constructor(private appState: AppState) {}

  ngOnInit(): void {
    this.appState.setPageCurrent('register');
    this.appState
      .getHeaderHeightCurrent()
      .subscribe((h) => (this.topBarHeight = h));
    this.form = new FormGroup({
      prefix: new FormControl<string>(''),
      firstName: new FormControl<string>('', Validators.required),
      lastName: new FormControl<string>('', Validators.required),
      phoneNumber: new FormControl<string>(''),
      email: new FormControl<string>('', Validators.required),
      password: new FormControl<string>('', Validators.required),
      confirmPassword: new FormControl<string>('', [Validators.required, this.confirmPasswordValidator.bind(this)]),
      allow: new FormControl<boolean>(false, Validators.required),
    });
  }

  confirmPasswordValidator(control: FormControl): { [key: string]: boolean } | null {
    const password = this.form.get('password')?.value;
    const confirmPassword = control.value;

    if (!confirmPassword) {
      return { 'confirmPasswordEmpty': true };
    }

    return password === confirmPassword ? null : { 'passwordMismatch': true };
  }

  getFormControlByKey(key: string) {
    return this.form.get(key) as FormControl;
  }
  onChecked(event: any) {
    this.getFormControlByKey('allow').setValue(event);
  }

  onSubmit(): void {
    console.log(this.form);
  }
}
