import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css'
})
export class CheckboxComponent {

    @Output() eventChangeToggle = new EventEmitter();
    @Input() inputId:string = '';
    @Input() label: string | undefined;
    @Input() inputChecked:boolean = false;
    @Input() disabled:boolean = false;
    checkboxValue: boolean = false;
  
    changeToggle(event: any) {
      this.checkboxValue = event.target.checked;
      this.eventChangeToggle.emit(this.checkboxValue)
    }
}
