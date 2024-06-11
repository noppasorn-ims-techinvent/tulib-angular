import { Component, OnInit, inject } from '@angular/core';
import { ButtonComponent } from '../../../../../components/button/button.component';
import { CartCardComponent } from '../../components/cart-card/cart-card.component';
import { TicketState } from '../../../ticket-state';
import { Booking } from '../../../../../interface/main/booking';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CartCardComponent, ButtonComponent, CommonModule, JsonPipe],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css',
})
export class CartListComponent implements OnInit {
  private ticketState = inject(TicketState);
  cartList: Booking[] = [];

  total: number = 0;

  ngOnInit(): void {
    this.ticketState.getCartlist().subscribe((b) => {
      this.cartList = b;
      console.log(b);
      
    });

    this.ticketState.getTotalPrice().subscribe((t) => (this.total = t));
  }

  delete(idx: number) {
    this.ticketState.deleteFromCartlist(idx);
  }
}
