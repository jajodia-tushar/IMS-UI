import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthGaurdResponse } from '../IMS.Models/AuthGaurdResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http : HttpClient) { }

  isAuthenticated(): Promise<AuthGaurdResponse> {
    return this.http.get<AuthGaurdResponse>('api/AuthGaurd').toPromise();
  }
}
