import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-area',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './input-area.component.html',
  styleUrl: './input-area.component.scss'
})
export class InputAreaComponent {
  @Input() FixedRoleInputArea: number = 4;
  @Input() FixedColInputArea:number | undefined;
  @Input() control = new FormControl();
  @Input() inputStyle: string = 'primary-input';
  @Input() inputPlaceHolder: string | undefined;
  @Input() inputIconPath: string | undefined;
  @Input() inputDisabled: boolean = false;
  @Input() inputError: boolean = false;
  statusShowCloseIcon: boolean = false;
  statusFocus: boolean = false;

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
