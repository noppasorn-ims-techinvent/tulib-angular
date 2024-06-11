import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { AppState } from '../../app-state';
import {
  ActivatedRoute,
  NavigationEnd,
  RouterModule,
  Router,
} from '@angular/router';
import { hasSubscribers } from 'diagnostics_channel';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css',
  // host: {
  //   '(document:click)': 'onClick($event)',
  // },
})
export class TopBarComponent implements OnInit {
  currentPage: string | undefined;
  showMenu = false;
  showUserMenu = false;
  showPointer: number = 0;
  showPageSelected: number = 0;
  topBarHeight: number = 200; // Default height
  menuTransform: number = 150;
  defaultImage = 'assets/icons/dot-tree-vertical.svg'; // Initial image path

  userDetail: any = {
    id: '',
    name: '',
    email: '',
    role: '',
  };

  @ViewChild('toggleButton') toggleButton: ElementRef | undefined;
  @ViewChild('toggleUserButton') toggleUserButton: ElementRef | undefined;
  @ViewChild('menu') menu: ElementRef | undefined;
  @ViewChild('userMenu') userMenu: ElementRef | undefined;

  constructor(
    private appState: AppState,
    private _eref: ElementRef,
    private router: Router,
    public authService: AuthService,
    private renderer: Renderer2
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      /**
       * Only run when toggleButton is not clicked
       * If we don't check this, all clicks (even on the toggle button) gets into this
       * section which in the result we might never see the menu open!
       * And the menu itself is checked here, and it's where we check just outside of
       * the menu and button the condition abbove must close the menu
       */
      if (
        e.target !== this.toggleButton!.nativeElement &&
        e.target !== this.menu!.nativeElement
      ) {
        this.showMenu = false;
      }
      if (this.authService.getUserDetail() != null) {
        if (
          e.target !== this.toggleUserButton!.nativeElement &&
          e.target !== this.userMenu!.nativeElement
        ) {
          this.toggleUserMenu(false);
        }
      }
    });
  }

  ngOnInit(): void {
    this.appState.getPageCurrent().subscribe((p) => {
      this.currentPage = p;
      if (p === 'home') {
        this.showPageSelected = 1;
      }
      this.setHeight();
    });

    this.authService.getUserDetail();
    // this.appState.getHeaderHeightCurrent().subscribe((h) => {
    //   console.log(h);
    //   this.menuTransform = h - 50;
    //   this.topBarHeight = h;
    // });
  }

  isLoggedin() {
    return this.authService.isLoggrdIn();
  }
  logout() {
    Swal.fire({
      title: 'ยืนยันออกจาระบบ ?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      // confirmButtonColor: "#3085d6",
      // cancelButtonColor: "#d33",
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        const logoutResult = this.authService.logout();
        if (logoutResult) {
          Swal.fire({
            title: 'ออกจากระบบ',
            // text: "Your file has been deleted.",
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              this.router.navigate(['/home']);
            }
          });
        }
      }
    });
  }
  setHeight(): void {
    if (this.currentPage === 'home') {
      this.topBarHeight = 450;
      this.menuTransform = 400;
      this.appState.setHeaderHeight(450);
    } else {
      this.topBarHeight = 200;
      this.menuTransform = 150;
      this.appState.setHeaderHeight(200);
    }
  }

  togglePointer(index: number) {
    this.showPointer = index;
  }

  toggleNavbar() {
    console.log('test');

    this.showMenu = !this.showMenu;
  }

  toggleUserMenu(event?: boolean) {
    if (event !== undefined) {
      this.showUserMenu = event;
    } else {
      this.showUserMenu = !this.showUserMenu;
    }

    if (this.showUserMenu) {
      this.changeImage('assets/icons/dot-tree-vertical-focus.svg');
    } else {
      this.changeImage('assets/icons/dot-tree-vertical.svg');
    }
  }

  // onClick(event: Event) {
  //   if (!this._eref.nativeElement.contains(event.target)) {
  //     if (this.showMenu) this.showMenu = false;
  //     if (this.showUserMenu) this.showUserMenu = false;
  //   }
  // }

  changeImage(newImage: string) {
    this.defaultImage = newImage;
  }
}
