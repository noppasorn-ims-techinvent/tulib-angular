import { CommonModule, KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbDropdownConfig, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-input-select-tag',
  standalone: true,
  imports: [CommonModule,NgbDropdownModule],
  templateUrl: './input-select-tag.component.html',
  styleUrl: './input-select-tag.component.scss',
  providers: [NgbDropdownConfig],
})
export class InputSelectTagComponent {
  @Input() dropdownDatas: Map<string, any> = new Map<string,any>();
  @Input() inputPlaceHolder: string = 'Select';
  @Input() dataSelected: any = [];
  @Input() setDataKeyIdSelected: any = [];
  @Output() eventSelectTag = new EventEmitter();

	constructor(config: NgbDropdownConfig) {
		config.placement = 'top-start';
	}

  //เรียงลำดับ
  setOrder = (a: KeyValue<string, any>, b: KeyValue<string, any>): any => {
    return 0;
  };

  selectItem(itemCheckBox: any, data: any) {
    if (itemCheckBox.checked) {
      this.dataSelected.push(data);

    } else {
      const indexToRemove = this.dataSelected.findIndex(
        (selectedData: { key: any }) => selectedData.key === data.key
      );
      if (indexToRemove !== -1) {
        this.dataSelected.splice(indexToRemove, 1);
      }
    }

    this.eventSelectTag.emit(this.dataSelected);
  }

  haveValueSelect(data: any): boolean {
    return this.dataSelected.some(
      (selectedData: any) => selectedData.key === data.key
    );
  }
}
