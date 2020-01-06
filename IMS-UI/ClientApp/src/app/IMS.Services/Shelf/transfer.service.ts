import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferRequest } from 'src/app/IMS.Models/Shelf/TransferRequest';

@Injectable({
  providedIn: 'root'
})
export class TransferService {


  constructor(private http: HttpClient) { }

  transferToShelf(transferRequest: TransferRequest) {
    return this.http.patch<Response>("api/transfer", transferRequest);
  }
}
