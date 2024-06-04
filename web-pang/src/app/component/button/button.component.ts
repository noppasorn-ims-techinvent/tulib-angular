import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() buttonText: string = 'Button';
  @Input() type: string = 'button';
  @Output() buttonClick = new EventEmitter<void>();

  clickAction() {
    this.buttonClick.emit();
  }
}
