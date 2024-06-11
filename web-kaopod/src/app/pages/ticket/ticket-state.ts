import { Injectable } from '@angular/core';
import { BehaviorSubject, scheduled } from 'rxjs';
import { Booking } from '../../interface/main/booking';
import { Schedule } from '../../interface/main/schedule';
import { Ticket } from '../../interface/main/ticket';

@Injectable({
  providedIn: 'root',
})
export class TicketState {
  selectedSchedule: BehaviorSubject<Schedule | undefined> = new BehaviorSubject<
    Schedule | undefined
  >(undefined);
  selectedDate: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());
  cartList: BehaviorSubject<Booking[]> = new BehaviorSubject<Booking[]>([]);
  totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  scheduleList: BehaviorSubject<Schedule[]> = new BehaviorSubject<Schedule[]>(
    []
  );
  ticketList: BehaviorSubject<Ticket[]> = new BehaviorSubject<Ticket[]>([]);
  constructor() {}

  //Date
  setSelectedDate(date: Date) {
    console.log(date);
    
    this.selectedDate.next(date);
  }

  getSelectedDate() {
    return this.selectedDate.asObservable();
  }

  //CartList
  setCartList(data: Ticket, quantity: number) {
    console.log(data);

    const existingItemIndex = this.cartList.value.findIndex((item) => {
      if (data.id) {
        return (
          item.ticket.id === data.id &&
          item.schedule.id === this.selectedSchedule.getValue()?.id
        );
      } else {
        return (
          item.ticket.promotionId === data.promotionId &&
          item.schedule.id === this.selectedSchedule.getValue()?.id
        );
      }
    });

    if (existingItemIndex !== -1) {
      const currentCart = this.cartList.value.slice();
      currentCart[existingItemIndex].quantity += quantity;
      this.cartList.next(currentCart);
    } else {
      const temp: Booking = {
        ticket: data!,
        date: this.selectedDate.getValue(),
        quantity: quantity,
        schedule: this.selectedSchedule.getValue()!,
      };

      const currentCart = this.cartList.value.slice();
      currentCart.push(temp);
      this.cartList.next(currentCart);
    }

    const totalQuantity = this.cartList.value.reduce(
      (sum, item) => sum + item.quantity * item.ticket.price,
      0
    );
    this.totalPrice.next(totalQuantity);
  }

  deleteFromCartlist(index: number) {
    const currentCart = this.cartList.value;
    if (index >= 0 && index < currentCart.length) {
      currentCart.splice(index, 1);
      this.cartList.next(currentCart);
    }
    const totalQuantity = currentCart.reduce(
      (sum, item) => sum + item.quantity * item.ticket?.price,
      0
    );
    this.totalPrice.next(totalQuantity);
  }

  getCartlist() {
    return this.cartList.asObservable();
  }
  //SelectedSchedule
  setSelectedSchedule(id: number | undefined) {
    const schedule = this.scheduleList
      .getValue()
      .find((schedule) => schedule.id === id);
    this.selectedSchedule.next(schedule);
  }

  getSelectedSchedule() {
    return this.selectedSchedule.asObservable();
  }
  //ScheduleList
  setSchedulelist(data: Schedule[]) {
    this.scheduleList.next(data);
  }

  getScheduleList() {
    return this.scheduleList.asObservable();
  }

  //TicketList
  setTicketList(data: Ticket[]) {
    this.ticketList.next(data);
  }
  getTicketList() {
    return this.ticketList.asObservable();
  }

  //TotalPrice
  getTotalPrice() {
    return this.totalPrice.asObservable();
  }
}
