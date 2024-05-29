import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { AppState } from '../app-state';
import {
  ActivatedRoute,
  NavigationEnd,
  RouterModule,
  Router,
} from '@angular/router';
import { hasSubscribers } from 'diagnostics_channel';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css',
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class TopBarComponent implements OnInit {
  currentPage: string | undefined;
  showMenu = false;
  topBarHeight: number = 200; // Default height
  menuTransform: number = 150;
  constructor(
    private appState: AppState,
    private _eref: ElementRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.appState.getPageCurrent().subscribe((p) => {
      this.currentPage = p;
      this.setHeight();
    });
    // this.appState.getHeaderHeightCurrent().subscribe((h) => {
    //   console.log(h);
    //   this.menuTransform = h - 50;
    //   this.topBarHeight = h;
    // });
  }
  setHeight(): void {
    if (this.currentPage === 'home') {
      this.topBarHeight = 450
      this.menuTransform = 400
      this.appState.setHeaderHeight(450);
    }
    else{
      this.topBarHeight = 200
      this.menuTransform = 150
      this.appState.setHeaderHeight(200);
    }
  }
  toggleNavbar() {
    this.showMenu = !this.showMenu;
  }

  onClick(event: Event) {
    if (!this._eref.nativeElement.contains(event.target)) this.showMenu = false;
  }
}
