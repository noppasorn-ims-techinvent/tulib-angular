import { Component } from '@angular/core';
import { ScheduleCardComponent } from '../../components/schedule-card/schedule-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-schedule-list',
  standalone: true,
  imports: [ScheduleCardComponent,CommonModule],
  templateUrl: './schedule-list.component.html',
  styleUrl: './schedule-list.component.css'
})
export class ScheduleListComponent {
   mockBookings: any[] = [
    {
      status: 'Booked',
      startTime: new Date('2024-06-06T08:00:00'),
      endTime: new Date('2024-06-06T10:00:00'),
      remain: 1
    },
    {
      status: 'Pending',
      startTime: new Date('2024-06-07T09:00:00'),
      endTime: new Date('2024-06-07T11:00:00'),
      remain: 3
    },
    {
      status: 'Cancelled',
      startTime: new Date('2024-06-08T10:00:00'),
      endTime: new Date('2024-06-08T12:00:00'),
      remain: 0
    }
  ];
}
