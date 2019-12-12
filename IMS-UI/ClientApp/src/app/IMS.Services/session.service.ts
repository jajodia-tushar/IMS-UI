import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionResponse } from '../IMS.Models/SessionResponse';
import { Shelf } from '../IMS.Models/ShelfResponse';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(private http : HttpClient) { }

  isAuthenticated(): Promise<SessionResponse> {
    return this.http.get<SessionResponse>('api/session').toPromise();
  }

  postShelfData(shelf :Shelf){
    return this.http.put<SessionResponse>('api/session',shelf);
  }
}
