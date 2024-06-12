import { CommonModule, KeyValue } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule,NgbDropdownModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {

  @Input() control = new FormControl();
  @Input() dropdownPlaceHolder:string = "กรุณาเลือกข้อมูล";
  @Input() dropdownIconPath :string | undefined;
  @Input() dropdownStyle: string = 'primary-dropdown';
  @Input() dropdownDisabled:boolean = false;
  @Input() dropdownError:boolean = false;
  @Input() dropdownDatas!: Map<string, any>;
  @Input() dropdownSelectedKey ?:string;

  ngOnInit(): void {
    if (this.dropdownSelectedKey != null && this.dropdownDatas.has(this.dropdownSelectedKey)) {
      const selectedData = this.dropdownDatas.get(this.dropdownSelectedKey);
      this.dropdownPlaceHolder = this.dropdownSelectedKey;
      this.control.setValue(selectedData);
    }
  }

  selectItem(dataItem:any){
    this.dropdownPlaceHolder = dataItem.key;
    this.control.setValue(dataItem.value);
  }

  //เรียงลำดับ
  originalOrder = (a: KeyValue<string,any>, b: KeyValue<string,any>): any => {
    return 0;
  }
}
