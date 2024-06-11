import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Booking } from '../../../../../interface/main/booking';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-cart-card',
  standalone: true,
  imports: [JsonPipe,CommonModule],
  templateUrl: './cart-card.component.html',
  styleUrl: './cart-card.component.css'
})
export class CartCardComponent {
@Input() data! :Booking
@Output() eventActionClick = new EventEmitter();


onClick() {
  this.eventActionClick.emit();
}


}
