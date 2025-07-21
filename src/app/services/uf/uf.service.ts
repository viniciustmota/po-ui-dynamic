import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UfService {
  private apiUrl = 'http://localhost:5093/api/Ufs';

  constructor(private http: HttpClient) { }

  getUfs() {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(this.apiUrl, {headers});
  }
}
