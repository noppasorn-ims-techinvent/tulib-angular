import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginRequest } from '../interface/auth/login-request';
import { Observable, map } from 'rxjs';
import { AuthResponse } from '../interface/auth/auth-response';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from '../interface/auth/register-request';
import Swal from 'sweetalert2'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
apiUrl : string = environment.apiUrl;
private tokerKey = 'token'


  constructor(private http:HttpClient) { }

login(data:LoginRequest): Observable<AuthResponse>{
return this.http.post<AuthResponse>(`${this.apiUrl}Account/detail`,data).pipe(
  map((response) => {
    if(response.isSuccess){
      localStorage.setItem(this.tokerKey,response.token)
    }
    return response
  })
)
}

register(data:RegisterRequest): Observable<AuthResponse>{
  return this.http.post<AuthResponse>(`${this.apiUrl}Account/register`,data).pipe(
    map((response) => {
      if(response.isSuccess){
        Swal.fire({
          title: 'Error!',
          text: 'Do you want to continue',
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
      return response
    })
  )
  }
}
