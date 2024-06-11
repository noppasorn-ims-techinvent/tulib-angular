import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
  input,
} from '@angular/core';
import { Ticket } from '../../../../../interface/main/ticket';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../../../components/input/input.component';
import { InputNumberComponent } from '../../../../../components/input-number/input-number.component';
import { ButtonComponent } from '../../../../../components/button/button.component';
import { TicketState } from '../../../ticket-state';
import { Schedule } from '../../../../../interface/main/schedule';

@Component({
  selector: 'app-ticket-card',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JsonPipe,
    InputNumberComponent,
    ButtonComponent,
  ],
  templateUrl: './ticket-card.component.html',
  styleUrl: './ticket-card.component.css',
})
export class TicketCardComponent implements OnInit {
  private ticketState = inject(TicketState);

  count: FormControl = new FormControl(0);
  @Input() data!: Ticket;
  @Output() eventActionClick = new EventEmitter();

  selectedSchedule?: Schedule;
  quantity: number = 0;

  ngOnInit(): void {
    this.ticketState.getSelectedSchedule().subscribe((s) => {
      this.selectedSchedule = s;
    });
    this.ticketState.getCartlist().subscribe((cartList) => {
      this.quantity = 0;
      this.count.setValue(0); 
      cartList.forEach((booking) => {
        if (booking.schedule.id === this.selectedSchedule?.id) {
          this.quantity += booking.quantity;
          console.log('Quantity from cart list:', this.quantity);
          console.log(this.selectedSchedule!.max - this.selectedSchedule!.count - this.count.value - this.quantity);
          
        }
      });
    });
  }
  increase() {
    this.count.setValue(this.count.value + 1);
  }

  decrease() {
    this.count.setValue(this.count.value - 1);
  }

  // onClick() {
  //   this.eventActionClick.emit();
  // }

  onAddToCart(data: Ticket, quantity: number) {
    this.ticketState.setCartList(data, quantity);
    this.count.setValue(0);
  }
}
