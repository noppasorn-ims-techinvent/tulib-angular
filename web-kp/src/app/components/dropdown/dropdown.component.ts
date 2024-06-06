import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DropDownOption } from '../../interface/base/option';
import { log } from 'console';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class DropdownComponent {
  @Input() placeholder: string = '';
  @Input() width: string = '';
  @Input() label: string = '';
  @Input() errorMessage: string | undefined;
  @Input() inputError: boolean = false;
  @Input() required: boolean = false;
  @Input() control = new FormControl();
  @Input() disabled: boolean = false;
  @Input() options: DropDownOption[] | undefined;

  selectKey: string | undefined;
  statusFocus: boolean = false;
  onSelected: boolean = false;

  constructor(private _eref: ElementRef) {}

  selectItem(dataItem: any) {
    console.log(dataItem);
   
    this.selectKey = dataItem.text;
    this.placeholder = dataItem.text;
    this.onSelected = true;
    this.control.setValue(dataItem.value);
    // this.inputError = false;
    this.onFocus(false);
    // this.eventSelectItem.emit(dataItem.value);
  }

  onFocus(event: boolean) {
    this.statusFocus = event;
    if (this.required) {
      if (this.required && (this.control.value || this.control.value !== '')) {
        this.inputError = false;
      } else {
        this.inputError = true;
      }
    }
  }

  onClick(event: Event) {
    if (this.statusFocus) {
      if (!this._eref.nativeElement.contains(event.target)) this.onFocus(false);
    }
  }
}
