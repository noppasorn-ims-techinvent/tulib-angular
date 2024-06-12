import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

import Swal from 'sweetalert2';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf,MatToolbarModule,MatButtonModule,CommonModule,MatIconModule,RouterLink,MatMenuModule,MatSidenavModule,MatListModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  closeResult: string | undefined;
  currentUrl:string = window.location.pathname;
  @Output() eventOpenSidebar = new EventEmitter();

  constructor(private offcanvasService: NgbOffcanvas) {}

  ngOnInit() {
  }

  openSidebar() {
    this.eventOpenSidebar.emit(null);
  }

  showNavbarPreview():boolean{
    if(this.currentUrl == "/prnew-preview-mobile" || this.currentUrl == "/prnew-preview-desktop"){
      return false;
    }else{
      return true;
    }
  }

  authService = inject(AuthService);
  router = inject(Router);

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  logout = () => {
    this.authService.logout();
    Swal.fire({
      title: 'Logout success!',
      icon: "success",
      confirmButtonText: "Close",
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/login'])
      }
    })
  }
}
