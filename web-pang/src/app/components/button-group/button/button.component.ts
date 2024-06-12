import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,NgIf],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() buttonStyle: string = "primary-button"
  @Input() buttonText : string = "Undefied";
  @Input() buttonIconPath:string | undefined;
  @Input() buttonClickValue:any | undefined;
  @Input() buttonDisabled:boolean = false;
  @Output() eventActionClick = new EventEmitter();

  clickAction(){
    this.eventActionClick.emit();
  }
}
