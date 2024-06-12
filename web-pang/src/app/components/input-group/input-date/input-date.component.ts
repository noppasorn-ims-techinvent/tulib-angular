import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-date',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './input-date.component.html',
  styleUrl: './input-date.component.scss'
})
export class InputDateComponent {
  @ViewChild('dateInput') dateInput: any;

  @Input() inputType: string = 'text';
  @Input() inputPlaceHolder: string = 'Select';
  @Input() inputStyle: string = 'primary-input';
  @Input() inputIconPath: string | undefined;
  @Input() inputDisabled: boolean = false;
  @Input() inputError: boolean = false;

  @Input() control = new FormControl();
  statusShowCloseIcon: boolean = false;
  statusFocus: boolean = false;

  selectDateFrom = new FormControl();

  ngOnInit(): void {
    this.control.disable();
    if (this.control.value != null) {
      this.selectedDateInDatePicker();
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

  async selectedDateInDatePicker() {
    var selectedDate: any = await new Date(this.control.value);
    const day = selectedDate.getDate();
    const month = selectedDate.getMonth() + 1; // Months are 0-indexed
    const year = selectedDate.getFullYear();
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;
    this.selectDateFrom.setValue((year + '-' + formattedMonth + '-' + formattedDay));
    this.selectedDate();
  }

  async selectedDate() {
    if (this.selectDateFrom.value) {
      var selectedDate: any = await new Date(this.selectDateFrom.value);
      const day = selectedDate.getDate();
      const month = selectedDate.getMonth() + 1; // Months are 0-indexed
      const year = selectedDate.getFullYear();
      const formattedDay = day < 10 ? '0' + day : day;
      const formattedMonth = month < 10 ? '0' + month : month;
      this.control.setValue(formattedDay + '/' + formattedMonth + '/' + year);
    } else {
      this.clearInput();
    }
  }
}
