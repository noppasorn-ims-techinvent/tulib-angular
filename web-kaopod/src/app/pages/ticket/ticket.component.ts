import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app-state';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent implements OnInit{

  constructor(private appState :AppState){

  }
  ngOnInit(): void {
    this.appState.setPageCurrent('ticket');

  }

}
