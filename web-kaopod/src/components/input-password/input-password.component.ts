import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-password',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './input-password.component.html',
  styleUrl: './input-password.component.css'
})
export class InputPasswordComponent implements OnChanges{
  @Input() placeholder: string = '';
  @Input() width: string = '';
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() disabled: boolean = false;
  @Input() errorMessage: string | undefined;
  @Input() inputError: boolean = false;
  @Input() required: boolean = false;
  @Input() control = new FormControl();
  
  showPassword: boolean = false;
  @Output() valueChange = new EventEmitter<string>();


  @ViewChild('inputRef') inputRef!: ElementRef;
  
  statusFocus: boolean = false;

  get value(): string {
    return this.control.value;
  }

  set value(val: string) {
    this.control.setValue(val);
    this.valueChange.emit(val);
  }

  ngOnChanges(): void {
    if (this.disabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }
 onFocus(event: boolean) {
    this.statusFocus = event;
   
  }
  focusInputElement() {
    this.inputRef.nativeElement.focus();
  }
  
  toggleShowPassword(){
    this.showPassword = !this.showPassword
  }
}
