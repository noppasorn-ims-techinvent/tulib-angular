import { Component, ElementRef, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LoginComponent } from './pages/login/login.component';
import { AppState } from './app-state';
import { HomeComponent } from './pages/home/home.component';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './pages/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
    TopBarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    EditProfileComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'web-kp';
  // currentPage: string | undefined;
  // topBarHeight: number = 200;
  // transform: number = 200; // Default height

  constructor(private appState: AppState) {}

  ngOnInit(): void {}
}
