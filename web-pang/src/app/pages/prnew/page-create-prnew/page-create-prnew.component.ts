import { Component } from '@angular/core';
import { Template1CreatePrnewComponent } from './template1-create-prnew/template1-create-prnew.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-page-create-prnew',
  standalone: true,
  imports: [Template1CreatePrnewComponent,NgbDropdownModule],
  templateUrl: './page-create-prnew.component.html',
  styleUrl: './page-create-prnew.component.scss'
})
export class PageCreatePrnewComponent {

}
