import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CreateTag } from '../interfaces/Tag/create-tag';
import { Observable, map } from 'rxjs';
import { TagResponse } from '../interfaces/Tag/tag-response';
import { QueryPagination } from '../interfaces/query-pagination';
import { PaginationList } from '../interfaces/pagination-list';
import { TagDto } from '../interfaces/Tag/tag-dto';
import { Result } from '../interfaces/result';
import { EditTag } from '../interfaces/Tag/edit-tag';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  apiUrl: string = environment.apiUrl;
  http = inject(HttpClient)

  constructor() {}

  getAllTag(): Observable<Result<TagDto[]>> {
    return this.http.get<Result<TagDto[]>>(`${this.apiUrl}tag/allTag`);
  }

  insertTag(data: CreateTag): Observable<TagResponse> {
    return this.http.post<TagResponse>(`${this.apiUrl}tag`, data).pipe(
      map((response: TagResponse) => {
        if (response) {
          return response;
        } else {
          throw new Error('Failed to create tag');
        }
      })
    );
  }

  editTag(data: EditTag): Observable<TagResponse> {
    return this.http.put<TagResponse>(`${this.apiUrl}tag`, data).pipe(
      map((response: TagResponse) => {
        if (response) {
          return response;
        } else {
          throw new Error('Failed to edit tag');
        }
      })
    );
  }

  getTagColor(
    searchQuery: QueryPagination
  ): Observable<Result<PaginationList<TagDto>>> {
    let parameters = new HttpParams();
    parameters = parameters.append('size', searchQuery.size);
    parameters = parameters.append('page', searchQuery.page);
    return this.http
      .get<Result<PaginationList<TagDto>>>(`${this.apiUrl}tag/all`, {
        params: parameters,
      })
      .pipe(
        map((response: Result<PaginationList<TagDto>>) => {
          if (response) {
            return response;
          } else {
            throw new Error('Failed to get tag');
          }
        })
      );
  }

  getTagColorList():Observable<Result<PaginationList<TagDto>>>{
    return this.http.get<Result<PaginationList<TagDto>>>(`${this.apiUrl}tag/getTag`);
  }
}
