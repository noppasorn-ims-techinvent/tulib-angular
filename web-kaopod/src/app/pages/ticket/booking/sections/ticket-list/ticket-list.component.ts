import { Component, OnInit, inject } from '@angular/core';
import { TicketCardComponent } from '../../components/ticket-card/ticket-card.component';
import { CommonModule } from '@angular/common';
import { TicketState } from '../../../ticket-state';
import { Ticket } from '../../../../../interface/main/ticket';
import { Schedule } from '../../../../../interface/main/schedule';
import { Booking } from '../../../../../interface/main/booking';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [TicketCardComponent, CommonModule],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.css',
})
export class TicketListComponent implements OnInit {
  ticketList: Ticket[] = [];
  selectedSchedule?: Schedule;
  
  constructor(private ticketState: TicketState) {}

  ngOnInit(): void {
    this.ticketState.getTicketList().subscribe((s) => {
      this.ticketList = s;
    });
    this.ticketState.getSelectedSchedule().subscribe((s) => {
      this.selectedSchedule = s;
    });
  
  }

 
}
