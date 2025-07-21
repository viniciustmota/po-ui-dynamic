import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { environment } from './../../../environments/environments';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PoNotificationService } from '@po-ui/ng-components';


@Injectable({
  providedIn: 'root'
})
export class MunicipioService {
  apiUrl = `${environment.apiBaseUrl}/Municipios`;

  constructor(
    private http: HttpClient,
    private poNotification : PoNotificationService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  CriarMunicipio(data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.apiUrl, data, { headers });
  }

  EditarMunicipio(data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(this.apiUrl, data, { headers });
  }

  ListarTodosMunicipios(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  obterCamposFormulario(): Observable<any> {
    return this.http.get(`${this.apiUrl}/metadata`)
  }

  getMunicipio(id: string): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/${id}`, { headers });
  }

  delete(id: string): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.delete<any[]>(`${this.apiUrl}/${id}`, { headers });
  }

  deleteBatch(ids: string[]): Observable<{deletedCount : number}> {
    console.log('Enviando IDs para deleteBatch:', ids);
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}/delete-many`, ids, { headers });
  }
}
