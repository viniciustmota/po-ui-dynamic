import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PoNotificationService } from '@po-ui/ng-components';
@Injectable({
  providedIn: 'root'
})
export class CepService {
  apiUrl = `${environment.apiBaseUrl}/Ceps`;

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

  getByCep(cep: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/${cep}/visualizacao`, { headers });
  }

  obterCamposFormulario(): Observable<any> {
    return this.http.get(`${this.apiUrl}/metadata`)
  }

  CriarMunicipio(data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.apiUrl, data, { headers });
  }

  EditarMunicipio(data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(this.apiUrl, data, { headers });
  }
}
