import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getSchedule(date: Date): Observable<any> {
    console.log(date);
    const formattedDate = this.formatDate(date);
    return this.http.get<any>(`${this.apiUrl}Schedule?date=${formattedDate}`);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding 1 since getMonth() returns 0-11
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}
