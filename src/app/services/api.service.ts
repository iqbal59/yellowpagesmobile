import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient //  private storageService: StorageService
  ) {}

  get<T>(
    url: string,
    observeResponseFlag: boolean = false,
    queryParams: any = null,
    authRequired: boolean = false,
    responseType = null
  ): Observable<T> {
    //  const token = this.storageService.getItem(StorageService.USER_ACCESS_TOKEN);
    const token = '';
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: new HttpParams(),
    };
    if (authRequired) {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        }),
        params: new HttpParams(),
      };
    }
    if (observeResponseFlag) {
      httpOptions['observe'] = 'response';
    }
    if (queryParams) {
      httpOptions.params = queryParams;
    }
    if (responseType) {
      httpOptions['responseType'] = responseType;
    }

    return this.http.get<T>(environment.baseUrl + url, httpOptions);
  }

  post<T, R>(
    url: string,
    request: T,
    observeResponseFlag: boolean = false,
    queryParams: any = null,
    authRequired: boolean = false,
    responseType = null
  ): Observable<R> {
    //const token = this.storageService.getItem(StorageService.USER_ACCESS_TOKEN);
    const token = '';
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: new HttpParams(),
    };
    if (authRequired) {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        }),
        params: new HttpParams(),
      };
    }

    if (observeResponseFlag) {
      httpOptions['observe'] = 'response';
    }
    if (queryParams) {
      httpOptions.params = queryParams;
    }
    if (responseType) {
      httpOptions['responseType'] = responseType;
    }
    return this.http.post<R>(environment.baseUrl + url, request, httpOptions);
  }

  put<T, R>(
    url: string,
    request: T,
    observeResponseFlag: boolean,
    queryParams?: any,
    authRequired: boolean = false
  ): Observable<R> {
    // const token = this.storageService.getItem(StorageService.USER_ACCESS_TOKEN);
    const token = '';
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: new HttpParams(),
    };
    if (authRequired) {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        }),
        params: new HttpParams(),
      };
    }

    if (observeResponseFlag) {
      httpOptions['observe'] = 'response';
    }
    if (queryParams) {
      httpOptions.params = queryParams;
    }
    return this.http.put<R>(environment.baseUrl + url, request, httpOptions);
  }

  delete<T>(
    url: string,
    observeResponseFlag: boolean = false,
    queryParams: any = null,
    authRequired: boolean = false
  ): Observable<T> {
    // const token = this.storageService.getItem(StorageService.USER_ACCESS_TOKEN);
    const token = '';
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: new HttpParams(),
    };
    if (authRequired) {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        }),
        params: new HttpParams(),
      };
    }
    if (observeResponseFlag) {
      httpOptions['observe'] = 'response';
    }
    if (queryParams) {
      httpOptions.params = queryParams;
    }

    return this.http.delete<T>(environment.baseUrl + url, httpOptions);
  }
}
