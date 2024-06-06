import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AppState } from '../../app-state';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(private appState: AppState,  @Inject(PLATFORM_ID) private platformId: any) {}
  windowScrolled = false;


  ngOnInit(): void {
    this.appState.setPageCurrent('home');
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', () => {
        this.windowScrolled = window.pageYOffset >= 450;
      });
    }
  }

  scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
