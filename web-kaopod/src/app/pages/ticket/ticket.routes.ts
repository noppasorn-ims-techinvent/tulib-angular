import { Routes } from "@angular/router";
import { TicketComponent } from "./ticket.component";

export const TICKET_ROUTES : Routes = [{
    path: '',
    component: TicketComponent,
    children: [
        {
            path: '',
            pathMatch: 'full',
            redirectTo: 'booking'
        },
        {
            path: 'booking',
            loadComponent: () => import('./booking/booking.component').then((m) => m.BookingComponent)
        }
    ]
}];