import { insertArticle } from './../interfaces/prnew/insertArticle';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../interfaces/result';
import { environment } from '../../environments/environment.development';
import { QueryPagination } from '../interfaces/query-pagination';
import { PaginationList } from '../interfaces/pagination-list';
import { PagePRnew } from '../interfaces/prnew/page-prnew';
import { articleData } from '../interfaces/prnew/articleData';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  apiUrl: string = environment.apiUrl;
  http = inject(HttpClient)
  constructor() { }

  insertArticle(insertData: insertArticle): Observable<Result<string>> {
    return this.http.post<Result<string>>(`${this.apiUrl}article`, insertData);
  }

  getArticle(searchQuery:QueryPagination):Observable<Result<PaginationList<PagePRnew>>> {
    let parameters = new HttpParams();
    parameters = parameters.append('size', searchQuery.size);
    parameters = parameters.append('page', searchQuery.page);

    return this.http.get<Result<PaginationList<PagePRnew>>>(`${this.apiUrl}article/all`, {
      params: parameters,
    });
  }

  getArticleById(Id: number): Observable<Result<articleData>> {
    let parameters = new HttpParams();
    parameters = parameters.append('articleId', Id);
    return this.http.get<Result<articleData>>(`${this.apiUrl}article`, {
      params: parameters,
    });
  }
}
