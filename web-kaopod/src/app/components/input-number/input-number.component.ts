import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { auditTime, debounceTime } from 'rxjs';

@Component({
  selector: 'app-input-number',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.css',
})
export class InputNumberComponent {
  @Input() placeholder: string = '';
  @Input() width: string = '';
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() style: string = '';
  @Input() disabled: boolean = false;
  @Input() errorMessage: string | undefined;
  @Input() inputError: boolean = false;
  @Input() required: boolean = false;
  @Input() control = new FormControl();
  @Input() position: string = 'left';
  @Input() max?: number;
  @Input() min?: number;
  @Input() inputSetTimeTextChange: number | undefined = undefined;
  @Output() valueChange = new EventEmitter();

  @ViewChild('inputRef') inputRef!: ElementRef;
  @Output() eventTextChangeDeboundTime = this.valueChange.pipe(
    debounceTime(
      this.inputSetTimeTextChange != undefined
        ? this.inputSetTimeTextChange
        : 400
    )
  );
  @Output() eventTextChangeAuditTime = this.valueChange.pipe(
    auditTime(
      this.inputSetTimeTextChange != undefined
        ? this.inputSetTimeTextChange
        : 400
    )
  );
  statusFocus: boolean = false;

  textChange() {
    let formattedValue = this.control.value;

    // formattedValue = this.formatMoneyInput(formattedValue);
    // console.log(formattedValue);
    
    this.control.setValue(formattedValue);

    this.valueChange.emit(formattedValue);
  }

  ngOnChanges(): void {
    if (this.disabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  onFocus(event: boolean) {
    this.statusFocus = event;

    if (!event) {
      if (!this.control.value) this.control.setValue(0);
    }
  }
}
