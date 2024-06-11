import { Component, OnInit, inject } from '@angular/core';
import { ScheduleCardComponent } from '../../components/schedule-card/schedule-card.component';
import { CommonModule } from '@angular/common';
import { TicketState } from '../../../ticket-state';
import { Schedule } from '../../../../../interface/main/schedule';
import { PromotionService } from '../../../../../services/promotion.service';
import { Ticket } from '../../../../../interface/main/ticket';
import { StandardPriceService } from '../../../../../services/standard-price.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-schedule-list',
  standalone: true,
  imports: [ScheduleCardComponent, CommonModule],
  templateUrl: './schedule-list.component.html',
  styleUrl: './schedule-list.component.css',
})
export class ScheduleListComponent implements OnInit {
  private promotionService = inject(PromotionService);
  private standardPrice = inject(StandardPriceService);
  scheduleList: Schedule[] = [];
  selected?: Schedule;
  selectedDate!: Date;

  constructor(private ticketState: TicketState) {}

  ngOnInit(): void {
    this.ticketState.getScheduleList().subscribe((s) => {
      this.scheduleList = s;
    });

    this.ticketState.getSelectedSchedule().subscribe((s) => {
      this.selected = s;
    });
    this.ticketState
      .getSelectedDate()
      .subscribe((s) => (this.selectedDate = s));
  }

  onSelected(id: number) {
    this.ticketState.setSelectedSchedule(id);
    // this.selected = id;

    let tempTicket: Ticket[] = [];

    forkJoin([
      this.promotionService.getPromotion(this.selectedDate),
      this.standardPrice.getStandardPrice(this.selectedDate),
    ]).subscribe(([promotionRes, standardPriceRes]) => {
      const ticketsPromotion: Ticket[] = promotionRes.data;
      const ticketsStandardPrice: Ticket[] = standardPriceRes.data;
    
      ticketsPromotion.forEach((ticket) => {
        ticket.promotionId = ticket.id;
        ticket.id = undefined; 
      });
    
      tempTicket = [...ticketsStandardPrice, ...ticketsPromotion];
    
      this.ticketState.setTicketList(tempTicket);
    });
    
  }
}
