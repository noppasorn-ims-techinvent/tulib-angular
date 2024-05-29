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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [InputComponent,ButtonComponent,CheckboxComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(private appState: AppState) {}

  ngOnInit(): void {
    this.appState.setPageCurrent('register');

    this.form = new FormGroup({
      // prefix: new FormControl<string>(''),
      firstName: new FormControl<string>('', Validators.required),
      lastName: new FormControl<string>('', Validators.required),
      phoneNumber: new FormControl<string>(''),
      email: new FormControl<string>('', Validators.required),
      password: new FormControl<string>('', Validators.required),
      confirmPassword: new FormControl<string>('', Validators.required),
      allow : new FormControl<boolean>(false, Validators.required)
    });
  }

  getFormControlByKey(key: string) {
    return this.form.get(key) as FormControl;
  }
  onChecked(event: any) {
    this.getFormControlByKey('allow').setValue(event);
  }

  onSubmt() : void{
    console.log(this.form);
    
  }
}
