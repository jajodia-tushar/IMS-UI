import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferRequest } from 'src/app/IMS.Modules/admin/Components/store-update/store-update.component';

@Injectable({
  providedIn: 'root'
})
export class TransferService {


  constructor(private http: HttpClient) { }

  transferToShelf(transferRequest: TransferRequest) {
    return this.http.patch<any>("api/transfer", transferRequest);
  }
}
