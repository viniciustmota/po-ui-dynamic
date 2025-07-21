import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginDto {
  email : string;
}

export interface LoginResultDto {
  authenticated : boolean;
  message : string;
  accessToken: string;
  userName: string;
  name: string;
  created: string;
  expiration: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly API_URL = `http://localhost:5093/api/login`;

  constructor(private http: HttpClient) {}

  login(data: LoginDto): Observable<LoginResultDto> {
    return this.http.post<LoginResultDto>(this.API_URL, data);
  }
}
