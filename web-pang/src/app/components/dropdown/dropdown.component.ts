import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {
  @Input() inputPlaceHolder: string = '';
  @Input() label: string = '';
  @Input() control!: FormControl;

  @Input() options: Map<any, { name: string, value: any }> | undefined;

  optionsArray: { key: any, value: { name: string, value: any } }[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options'] && this.options) {
      this.optionsArray = Array.from(this.options, ([key, value]) => ({ key, value }));
    }
  }
}
