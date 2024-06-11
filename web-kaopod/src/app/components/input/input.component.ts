import { style } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
  input,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent implements OnChanges{
  @Input() placeholder: string = '';
  @Input() width: string = '';
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() style: string = ''
  @Input() disabled: boolean = false;
  @Input() errorMessage: string | undefined;
  @Input() inputError: boolean = false;
  @Input() required: boolean = false;
  @Input() control = new FormControl();
  @Input() position : string = 'left'

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
}
