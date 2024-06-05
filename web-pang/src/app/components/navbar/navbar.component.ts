import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import Swal from 'sweetalert2';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule,MatButtonModule,CommonModule,MatIconModule,RouterLink,MatMenuModule,MatSidenavModule,MatListModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  authService = inject(AuthService);
  router = inject(Router);

  constructor(private sidebarService: SidebarService){

  }

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
