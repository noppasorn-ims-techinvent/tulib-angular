
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { DatePickerComponent } from '../../../components/date-picker/date-picker.component';
import { TicketListComponent } from './sections/ticket-list/ticket-list.component';
import { ScheduleListComponent } from './sections/schedule-list/schedule-list.component';
import { CartListComponent } from './sections/cart-list/cart-list.component';
@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [DatePickerComponent,TicketListComponent,ScheduleListComponent,CartListComponent],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit{
 
  selectedDate = new FormControl(); 
  showSchedule : boolean = false
  
  ngOnInit(): void {
    // Subscribe to value changes of selectedDate
    this.selectedDate.valueChanges.subscribe((value) => {
      // Call your function here
      this.onSelectedDate(value);
    });
  }

  onSelectedDate(value: any) {
    // Your function logic here
    this.showSchedule = true
  }
}
