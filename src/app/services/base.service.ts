import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private baseUrl: string = '';

  constructor(private http: HttpClient, private router: Router) {
    this.baseUrl = environment['baseUrl'];
  }

  get<T>(url: string): Observable<T> {
    url = this.baseUrl + '/' + url;
    return this.http.get<T>(url);
  }

  post<T,U>(url: string, body: T): Observable<U> {
    url = this.baseUrl + '/' + url;
    return this.http.post<U>(url, body);
  }

  put<T,U>(url: string, body: T): Observable<U> {
    url = this.baseUrl + '/' + url;
    return this.http.put<U>(url, body);
  }

  delete<T>(url: string, id: string): Observable<T>  {
    url = this.baseUrl + '/' + url + '/' + id;
    return this.http.delete<T>(url);
  }

}
