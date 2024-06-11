import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPromotion(date: Date): Observable<any> {
    const formattedDate = this.formatDate(date);
    return this.http.get<any>(`${this.apiUrl}Promotion/all?date=${formattedDate}`);
  }
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}
