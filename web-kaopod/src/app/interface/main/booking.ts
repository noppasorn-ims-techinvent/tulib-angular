import { Schedule } from "./schedule";
import { Ticket } from "./ticket";

export interface Booking {
  date : Date,
  ticket:Ticket
  quantity : number,
  schedule : Schedule
}
