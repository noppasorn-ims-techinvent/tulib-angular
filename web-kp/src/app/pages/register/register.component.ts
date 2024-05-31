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
  form: FormGroup = new FormGroup({});
  options: Option[] = [
    {
      text: 'นางสาว',
      value: 1,
    },
    {
      text: 'นาง',
      value: 2,
    },
    {
      text: 'นาย',
      value: 3,
    },
  ];
  constructor(private appState: AppState) {}

  ngOnInit(): void {
    this.appState.setPageCurrent('register');
    this.appState
      .getHeaderHeightCurrent()
      .subscribe((h) => (this.topBarHeight = h));
    this.form = new FormGroup({
      // prefix: new FormControl<string>(''),
      firstName: new FormControl<string>('', Validators.required),
      lastName: new FormControl<string>('', Validators.required),
      phoneNumber: new FormControl<string>(''),
      email: new FormControl<string>('', Validators.required),
      password: new FormControl<string>('', Validators.required),
      confirmPassword: new FormControl<string>('', Validators.required),
      allow: new FormControl<boolean>(false, Validators.required),
    });
  }

  getFormControlByKey(key: string) {
    return this.form.get(key) as FormControl;
  }
  onChecked(event: any) {
    this.getFormControlByKey('allow').setValue(event);
  }

  onSubmt(): void {
    console.log(this.form);
  }
}
