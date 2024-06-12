import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../../../../../components/button-group/button/button.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from '../../../../../components/dropdown-group/dropdown/dropdown.component';

@Component({
  selector: 'app-header-template1-edit-prnew',
  standalone: true,
  imports: [ButtonComponent,DropdownComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './header-template1-edit-prnew.component.html',
  styleUrl: './header-template1-edit-prnew.component.scss'
})
export class HeaderTemplate1EditPrnewComponent {
  @Input() formEdit!: FormGroup;
  @Output() eventEditPRNew = new EventEmitter();
  @Output() eventOpenPreviewDeskTop = new EventEmitter();
  @Output() eventOpenPreviewMobile = new EventEmitter();
  @Output() eventBackToPagePRNew = new EventEmitter();
  dataStatus: Map<any, any> = new Map<string, any>();

  ngOnInit(): void {
    this.dataStatus.set('Active', true);
    this.dataStatus.set('Inactive', false);
  }

  backToPagePRNew(){
    this.eventBackToPagePRNew.emit()
  }

  editPRNew() {
    this.eventEditPRNew.emit();
  }

  getFormEditControlByKey(key: string) {
    return this.formEdit.get(key) as FormControl;
  }

  ValidateButtonAdd():boolean{
    return this.formEdit.invalid;
  }
}
