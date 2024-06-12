import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { InputNormalComponent } from '../../../components/input-normal/input-normal.component';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { InputDropdownComponent } from '../../../components/input-dropdown-color/input-dropdown-color.component';
import { CommonModule, NgIf } from '@angular/common';
import { TagService } from '../../../services/tag.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';
import {MatFormField, MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { DropdownComponent } from '../../../components/dropdown/dropdown.component';
import { EditTag } from '../../../interfaces/Tag/edit-tag';
import { CreateTag } from '../../../interfaces/Tag/create-tag';

@Component({
  selector: 'app-modal-tags',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    InputNormalComponent,
    InputDropdownComponent,
    DropdownComponent,
    CommonModule,
    FormsModule,
    MatInputModule,
    NgIf
  ],
  templateUrl: './modal-tags.component.html',
  styleUrl: './modal-tags.component.scss',
})

export class ModalTagsComponent {
  constructor(public dialogRef: MatDialogRef<ModalTagsComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = new FormGroup({
      id: new FormControl(data.tagData ? data.tagData.id : ''),
      name: new FormControl(data.tagData ? data.tagData.name : ''),
      code: new FormControl(data.tagData ? data.tagData.code : ''),
      active: new FormControl(data.tagData ? data.tagData.active : true),
    });
  }

  tagService = inject(TagService);
  authService = inject(AuthService);

  dropdownLabel: string = 'Select an option';
  dropdownControl: FormControl = new FormControl();
  dropdownOptions: { value: string, label: string }[] = [];

  dataColor: Map<string, any> = new Map<string, any>([
    ['orange', { name: 'Orange', color: '#F2994A' }],
    ['red', { name: 'Red', color: '#EB5757' }],
    ['green', { name: 'Green', color: '#27AE60' }],
    ['yellow', { name: 'Yellow', color: '#FFEA00' }]
  ]);

  dataAvtive: Map<boolean, { name: string, value: boolean }> = new Map<boolean, { name: string, value: boolean }>([
    [true, { name: 'Active', value: true }],
    [false, { name: 'InActive', value: false }]
  ]);

  insertTag(){
    var createTag: CreateTag = {
      code: this.getFormEditControlByKey('code').value,
      name: this.getFormEditControlByKey('name').value,
      active: JSON.parse(this.getFormEditControlByKey('active').value)
    };

    console.log(createTag);

    this.tagService.insertTag(createTag).subscribe({
      next:(response) => {
        Swal.fire({
          title: 'Success!',
          text: 'create tag succesfully',
          icon: "success",
          confirmButtonText: "Submit",
        }).then((result) => {
          if (result.isConfirmed) {
            this.dialogRef.close();
          }
        })
      },
      error:(error) => {
        Swal.fire({
          title: 'Fail!',
          text: 'Failed to create tag',
          icon: "error",
          confirmButtonText: "Submit",
        })
      }
    })
  }

  editTag(){
    var updateTag: EditTag = {
      id: this.getFormEditControlByKey('id').value,
      code: this.getFormEditControlByKey('code').value,
      name: this.getFormEditControlByKey('name').value,
      active: JSON.parse(this.getFormEditControlByKey('active').value)
    };

    console.log(updateTag);

    this.tagService.editTag(updateTag).subscribe({
      next:(response) => {

        Swal.fire({
          title: 'Success!',
          text: 'Edit tag succesfully',
          icon: "success",
          confirmButtonText: "Submit",
        }).then((result) => {
          if (result.isConfirmed) {
            this.dialogRef.close();
          }
        })
      },
      error:(error) => {
        Swal.fire({
          title: 'Fail!',
          text: 'Failed to edit tag',
          icon: "error",
          confirmButtonText: "Submit",
        })
      }
    })
  }


  actionSelectCreateTag(item: any) {
    this.getFormCreateControlByKey('code').setValue(item.value.color);
  }

  getFormCreateControlByKey(key: string) {
    return this.form.get(key) as FormControl;
  }

  actionSelectEditTag(item: any) {
    this.getFormEditControlByKey('code').setValue(item.value.code);
  }

  getFormEditControlByKey(key: string) {
    return this.form.get(key) as FormControl;
  }

  form!: FormGroup;

  onClose(): void {
    this.dialogRef.close();
  }

  getKey(string: string) {
    return this.form.get(string) as FormControl;
  }

  isOpen: boolean = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

}
