import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-schedule-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedule-card.component.html',
  styleUrl: './schedule-card.component.css'
})
export class ScheduleCardComponent {

  @Input() data : any
}
