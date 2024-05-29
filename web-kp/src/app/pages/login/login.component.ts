import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app-state';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(private appState: AppState) {}
  
  ngOnInit(): void {
    this.appState.setPageCurrent('login');
  }
}
