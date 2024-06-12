
import { CommonModule, KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-input-dropdown',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,NgbDropdownModule],
  templateUrl: './input-dropdown-color.component.html',
  styleUrl: './input-dropdown-color.component.scss'
})
export class InputDropdownComponent {
  @Input() dropdownDatas!: Map<string, any>;
  @Input() inputPlaceHolder: string = 'Select';
  @Input() inputStyle: string = 'primary-input';
  @Output() eventSelectTag = new EventEmitter();
  @Input() dataSelected: any;
  @Input() label: string = '';

  @Input() dataSelectedValueId: any;
  @Input() dataSelectedValueCodeColor: any;

  ngOnInit(): void {
    if (this.dataSelectedValueId != null) {
      this.findValueId(this.dataSelectedValueId);
    }

    if (this.dataSelectedValueCodeColor != null) {
      this.findCodeColorValue(this.dataSelectedValueCodeColor);
    }
  }

  findValueId(selectedValue: any): void {
    const selectedEntry = [...this.dropdownDatas.entries()].find(
      ([key, value]) => value.id === selectedValue
    );

    if (selectedEntry) {
      const [selectedKey, selectedValue] = selectedEntry;
      const result = {
        key: selectedKey,
        value: selectedValue,
      };
      this.selectIdColor(result);
    }
  }

  findCodeColorValue(selectedValue: any): void {
    const selectedEntry = [...this.dropdownDatas.entries()].find(
      ([key, value]) => value.color === selectedValue
    );

    if (selectedEntry) {
      const [selectedKey, selectedValue] = selectedEntry;
      const result = {
        key: selectedKey,
        value: selectedValue,
      };
      this.selectIdColor(result);
    }
  }

  setOrder = (a: KeyValue<string, any>, b: KeyValue<string, any>): any => {
    return 0;
  };

  selectIdColor(item: any) {
    this.dataSelected = null;
    this.dataSelected = item;
    this.eventSelectTag.emit(item);
  }
}
