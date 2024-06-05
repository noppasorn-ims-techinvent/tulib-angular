import { CommonModule, NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { auditTime, debounceTime } from 'rxjs';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-input-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,MatIconModule,NgIf],
  templateUrl: './input-password.component.html',
  styleUrl: './input-password.component.scss'
})
export class InputPasswordComponent {
  @Input() inputPlaceHolder: string = '';
  @Input() label: string = '';
  @Input() control!: FormControl;
  hidePassword: boolean = true;

  @Output() inputValueChange = new EventEmitter<string>();

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
