import { CommonModule, JsonPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-schedule-card',
  standalone: true,
  imports: [CommonModule,JsonPipe],
  templateUrl: './schedule-card.component.html',
  styleUrl: './schedule-card.component.css'
})
export class ScheduleCardComponent {
  @Input() data : any
  @Input() onSelected : boolean = false
  @Output() eventActionClick = new EventEmitter();
  


   onClick() {
    this.eventActionClick.emit();
  }

}
