import { Component } from '@angular/core';
import { Template1EditPrnewComponent } from './template1-edit-prnew/template1-edit-prnew.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-edit-prnew',
  standalone: true,
  imports: [Template1EditPrnewComponent],
  templateUrl: './page-edit-prnew.component.html',
  styleUrl: './page-edit-prnew.component.scss'
})
export class PageEditPrnewComponent {
  idComponent?:string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {

  }
}
