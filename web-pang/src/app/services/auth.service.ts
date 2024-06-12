import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LoginRequest } from '../interfaces/Auth/login-request';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../interfaces/Auth/auth-response';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = environment.apiUrl;
  private tokenKey = 'token';
  constructor(private http:HttpClient) { }

  login(data:LoginRequest): Observable<AuthResponse> {
    return this.http
    .post<AuthResponse>(`${this.apiUrl}account/login`,data)
    .pipe(
      map((response) => {
        if (response.isSuccess) {
          localStorage.setItem(this.tokenKey,response.token);
        }
        return response;
      })
    )
  }

  getUserDetail = () => {
    const token = this.getToken();
    if (!token) return null;
    const decodedToken: any = jwtDecode(token);
    const userDetail = {
      id: decodedToken.nameId,
      name: decodedToken.name,
      email:decodedToken.email,
      roles:decodedToken.role || []
    }

    return userDetail;
  }

  hasRole(role: string): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decodedToken: any = jwtDecode(token);
      const userRoles = decodedToken.role || [];

      return userRoles.includes(role);
    } catch (error) {
      console.error('Error decoding token', error);
      return false;
    }
  }

  isLoggedIn=(): boolean =>{
    const token = this.getToken();
    if(!token) return false;

    return !this.isTokenExpired();
  }

  private isTokenExpired() {
    const token = this.getToken();
    if(!token) return true;
    const decoded = jwtDecode(token);
    const isTokenExpired = Date.now() >= decoded['exp']! * 1000;
    if (isTokenExpired) this.logout();
    return isTokenExpired;
  }

  logout = (): void => {
    localStorage.removeItem(this.tokenKey);
  }

  getToken = (): string|null => localStorage.getItem(this.tokenKey) || '';
}
