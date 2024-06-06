import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginRequest } from '../interface/auth/login-request';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthResponse } from '../interface/auth/auth-response';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from '../interface/auth/register-request';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import { UserDetail } from '../interface/auth/user-detail';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = environment.apiUrl;

  private tokerKey = 'token';

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}Account/login`, data)
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            localStorage.setItem(this.tokerKey, response.token);
          }
          return response;
        })
      );
  }
  getToken = (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.tokerKey) || '';
    } else {
      // Handle case where localStorage is not available (optional)
      return null;
    }
  };

  isLoggrdIn = (): boolean => {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    return !this.isTokenExpired();
  };

  private isTokenExpired() {
    const token = this.getToken();
    if (!token) {
      return true;
    }
    const decoded = jwtDecode(token);
    const isTokenExpired = Date.now() >= decoded['exp']! * 1000;
    if (isTokenExpired) {
      this.logout();
    }
    return isTokenExpired;
  }

  getUserDetail = () => {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const decodeedToken: any = jwtDecode(token);
    const userDetail = {
      id: decodeedToken.nameid,
      email: decodeedToken.email,
      name: decodeedToken.name,
      role: decodeedToken.role,
    };
    return userDetail;
  };

  logout = (): Boolean => {
    localStorage.removeItem(this.tokerKey);

    return true;
  };

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}Account/register`, data)
      .pipe(
        catchError((error) => {
          // Log the error
          let errorMessage = 'An error occurred';
          if (error.error && Array.isArray(error.error)) {
            const errorObject = error.error[0]; // Assuming only one error object is returned
            errorMessage = `${errorObject.code}: ${errorObject.description}`;
          }

          // Return a dummy response or null in case of error
          const dummyResponse: AuthResponse = {
            isSuccess: false,
            message: 'อีเมลนี้ได้ถูกใช้แล้วไม่สามารถลงทะเบียนได้',
            token: '',
          };
          // Wrap the error response object in an observable using 'of' function
          return of(dummyResponse);
        }),
        // Continue emitting the original response if no error occurred
        map((response: AuthResponse) => {
          // If no error occurred, return the original response with isSuccess flag set to true
          return response;
        })
      );
  }
update(data : UserDetail): Observable<AuthResponse>{
  return this.http.put<AuthResponse>(`${this.apiUrl}Account/update`,data)
}
  getDetail = (): Observable<UserDetail> =>
    this.http.get<UserDetail>(`${this.apiUrl}Account/detail`);
}
