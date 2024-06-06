import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
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
export class DropdownComponent implements OnChanges{
  @Input() placeholder: string = '';
  @Input() width: string = '';
  @Input() label: string = '';
  @Input() errorMessage: string | undefined;
  @Input() inputError: boolean = false;
  @Input() required: boolean = false;
  @Input() control = new FormControl();
  @Input() disabled: boolean = false;
  @Input() options!: DropDownOption[] ;
  @Input() selectedKey? : string 

  selectKey: string | undefined;
  statusFocus: boolean = false;
  onSelected: boolean = false;

  constructor(private _eref: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.selectedKey);
    
    if (this.selectedKey) {
      this.handleSelectionByKey(this.selectedKey);
    }

  }

  private handleSelectionByKey(selectedKey: string): void {
    const selectedItem = this.options.find(option => option.text === selectedKey);
    console.log(selectedItem);
    
    if (selectedItem) {
      // this.placeholder = selectedKey;
  
      
      this.selectItem(selectedItem);
    }
  }

  selectItem(dataItem: any) {
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
