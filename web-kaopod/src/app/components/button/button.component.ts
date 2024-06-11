import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() style: string = '';
  @Input() color: string = '#008ECF';
  @Input() width: string | undefined;
  @Input() text: string = 'Undefied';
  @Output() eventActionClick = new EventEmitter();
  @Input() iconPath: string | undefined;
  @Input() disabled: boolean = false;

  onClick() {
    this.eventActionClick.emit();
  }
}
