import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-headerbar',
  standalone: true,
  imports: [SidebarComponent,NavbarComponent],
  templateUrl: './headerbar.component.html',
  styleUrl: './headerbar.component.scss'
})
export class HeaderbarComponent {
  @ViewChild('sidebar') sidebar?: SidebarComponent;

  actionOpenEventSidebar(value:any) {
    this.sidebar?.eventOpenSidebar();
	}
}
