import { CommonModule, JsonPipe } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  NgbAlertModule,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [
    NgbDatepickerModule,
    NgbAlertModule,
    JsonPipe,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css',
})
export class DatePickerComponent {
  @ViewChild('dateInput') dateInput: any;

  @Input() id: string = '';
  @Input() label: string | undefined;
  @Input() placeHolder: string = 'Select';
  @Input() width: string | undefined;
  @Input() disabled: boolean = false;
  @Input() inputError: boolean = false;
  @Input() errorMessage: string | undefined;

  // @Input() labelPosition: string | undefined;
  // @Input() labelPadding: string | undefined;
  // @Input() labelWidth: string | undefined;

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
    // if (this.control?.value?.length > 0) {
    //   this.statusShowCloseIcon = true;
    // }
  }

  actionLostFocusInput() {
    this.statusFocus = false;
    // setTimeout(() => {
    //   this.statusShowCloseIcon = false;
    // }, 250);
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
    this.selectDateFrom.setValue(
      year + '-' + formattedMonth + '-' + formattedDay
    );
    this.selectedDate();
  }

  async selectedDate() {
    const { year, month, day } = this.selectDateFrom.value;
    const selectedDate = new Date(year, month - 1, day);
    const selectedDay = selectedDate.getDate();
    const selectedMonth = selectedDate.getMonth() + 1; // Months are 0-indexed
    const selectedYear = selectedDate.getFullYear();
    const formattedDay = selectedDay < 10 ? '0' + selectedDay : selectedDay;
    const formattedMonth =
      selectedMonth < 10 ? '0' + selectedMonth : selectedMonth;

    this.control.setValue(
      formattedDay + '/' + formattedMonth + '/' + selectedYear
    );
  }
}
