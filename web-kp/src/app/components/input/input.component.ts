import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @Input() placeholder: string = '';
  @Input() width: string = '';
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() disabled: boolean = false;
  @Input() errorMessage: string | undefined;
  @Input() inputError: boolean = false;
  @Input() requred: boolean = false;
  @Input() control = new FormControl();

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

 onFocus(event: boolean) {
    this.statusFocus = event;
   
  }
  focusInputElement() {
    this.inputRef.nativeElement.focus();
  }
  
}
