import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import {
  NgbAlertModule,
  NgbDatepickerModule,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { DatePickerComponent } from '../../../components/date-picker/date-picker.component';
import { TicketListComponent } from './sections/ticket-list/ticket-list.component';
import { ScheduleListComponent } from './sections/schedule-list/schedule-list.component';
import { CartListComponent } from './sections/cart-list/cart-list.component';
import { TicketState } from '../ticket-state';
import { ScheduleService } from '../../../services/schedule.service';
import { Schedule } from '../../../interface/main/schedule';
@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    DatePickerComponent,
    TicketListComponent,
    ScheduleListComponent,
    CartListComponent,
    CommonModule,
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
})
export class BookingComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  private ticketState = inject(TicketState);
  private scheduleService = inject(ScheduleService);
  selectedDate = new FormControl();
  selectedSchedule?: Schedule = undefined;
  showSchedule: boolean = false;

  ngOnInit(): void {
    this.selectedDate.valueChanges.subscribe((value) => {
      this.selectedSchedule = undefined;
      this.ticketState.setSelectedSchedule(undefined);
      this.onSelectedDate(value);

      if (value) {
        const dateParts = value.split('/');

        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1;
        const year = parseInt(dateParts[2], 10);

        const dateObject = new Date(year, month, day);
        console.log(dateObject);

        this.ticketState.setSelectedDate(dateObject);
        this.onShowSchedule(dateObject);
      }
    });

    this.ticketState
      .getSelectedSchedule()
      .subscribe((s) => (this.selectedSchedule = s));
  }

  onSelectedDate(value: any) {
    this.showSchedule = true;
  }

  onShowSchedule(date: Date) {
    this.scheduleService.getSchedule(date).subscribe((res) => {
      console.log(res);
      if(res.data?.scheduleTimes != null){
         this.ticketState.setSchedulelist(res.data.scheduleTimes);
      }
      else{
        this.ticketState.setSchedulelist([]);
      }
     
    });
  }
}
