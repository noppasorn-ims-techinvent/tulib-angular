import { Component, ViewChild } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  closeResult: string | undefined;
  @ViewChild("Sidebar") sidebar?:any

  constructor(private offcanvasService: NgbOffcanvas) {}

  eventOpenSidebar(){
    this.offcanvasService.open(this.sidebar, { position: 'start'});
  }
}
