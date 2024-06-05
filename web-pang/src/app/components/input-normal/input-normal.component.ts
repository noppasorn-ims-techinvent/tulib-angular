import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-normal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input-normal.component.html',
  styleUrl: './input-normal.component.scss'
})
export class InputNormalComponent {
  @Input() inputPlaceHolder: string = '';
  @Input() label: string = '';
  @Input() control!: FormControl;
}
