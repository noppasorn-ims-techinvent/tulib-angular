import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../../../../../components/button-group/button/button.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header-create-prnew',
  standalone: true,
  imports: [CommonModule,ButtonComponent],
  templateUrl: './header-create-prnew.component.html',
  styleUrl: './header-create-prnew.component.scss'
})
export class HeaderCreatePrnewComponent {
  @Input() formCreate!: FormGroup;

  @Output() eventCreatePRNew = new EventEmitter();
  @Output() eventOpenPreviewDeskTop = new EventEmitter();
  @Output() eventOpenPreviewMobile = new EventEmitter();
  @Output() eventBackToPagePRNew = new EventEmitter();

  backToPagePRNew(){
    this.eventBackToPagePRNew.emit()
  }

  createPRNew() {
    console.log('create');

    this.eventCreatePRNew.emit();
  }

  getFormCreateControlByKey(key: string) {
    return this.formCreate.get(key) as FormControl;
  }

  ValidateButtonAdd():boolean{
    return this.formCreate.invalid;
  }
}
