import { CommonModule, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule,NgIf,ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() inputType: string = 'text';
  @Input() inputPlaceHolder: string | undefined;
  @Input() inputStyle: string = 'primary-input';
  @Input() inputIconPath: string | undefined;
  @Input() inputDisabled:boolean = false;
  @Input() inputError:boolean = false;
  @Input() control = new FormControl();
  statusShowCloseIcon: boolean = false;
  statusFocus:boolean = false;

  ngOnInit(): void {
    if(this.inputDisabled){
      this.control.disable()
    }
  }

  actionFocusInput() {
    this.statusFocus = true;
    if (this.control?.value?.length > 0) {
      this.statusShowCloseIcon = true;
    }
  }

  actionLostFocusInput() {
    this.statusFocus = false;
    setTimeout(() => {
      this.statusShowCloseIcon = false;
    }, 250);
  }

  textChange() {
    if (this.control.value.length > 0) {
      this.statusShowCloseIcon = true;
    } else {
      this.statusShowCloseIcon = false;
    }
  }

  clearInput() {
    this.control.setValue('');
  }
}
