import { Injectable } from '@angular/core';
import { RAGDataModel } from 'src/app/IMS.Models/Admin/RAGDataModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RAGStatusResponse } from 'src/app/IMS.Models/Admin/RAGStatusResponse';

@Injectable({
  providedIn: 'root'
})
export class RagStatusService {

  constructor(private httpClient: HttpClient) { }

  getRAGStatusData() {
    return this.httpClient.get<RAGStatusResponse>("api/ragstatus/");
  }

}
