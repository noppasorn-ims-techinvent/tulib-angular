import { Component, EventEmitter, Output, ViewChild, inject } from '@angular/core';
import { ButtonComponent } from '../../../../components/button-group/button/button.component';
import { InputComponent } from '../../../../components/input-group/input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { InputSelectTagComponent } from '../../../../components/input-group/input-select-tag/input-select-tag.component';
import { InputDateComponent } from '../../../../components/input-group/input-date/input-date.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-head-prnew',
  standalone: true,
  imports: [
    ButtonComponent,
    InputComponent,
    CommonModule,
    ReactiveFormsModule,
    InputSelectTagComponent,
    InputDateComponent,
  ],
  templateUrl: './head-prnew.component.html',
  styleUrl: './head-prnew.component.scss',
})
export class HeadPrnewComponent {
  @Output() eventOpenSidebarFilter = new EventEmitter();
  router = inject(Router)

  testClick() {
    console.log('Click');
  }

  openSidebarFilterEnd() {
    this.eventOpenSidebarFilter.emit();
  }

  openPageCreatePRNew(){
    this.router.navigate(['/create-prnew']);
  }
}
