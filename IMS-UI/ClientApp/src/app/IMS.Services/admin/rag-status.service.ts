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

  //   return [
  //     {
  //       shelfName: "Warehouse",
  //       shelfCode: "A",
  //       data: [
  //         {
  //           colour: "Red",
  //           count: 9
  //         },
  //         {
  //           colour: "Amber",
  //           count: 9
  //         },
  //         {
  //           colour: "Green",
  //           count: 9
  //         }
  //       ]
  //     },
  //     {
  //       shelfName: "First Floor",
  //       shelfCode: "B",
  //       data: [
  //         {
  //           colour: "Red",
  //           count: 9
  //         },
  //         {
  //           colour: "Amber",
  //           count: 9
  //         },
  //         {
  //           colour: "Green",
  //           count: 9
  //         }
  //       ]
  //     },
  //     {
  //       shelfName: "Second Floor",
  //       shelfCode: "C",
  //       data: [
  //         {
  //           colour: "Red",
  //           count: 9
  //         },
  //         {
  //           colour: "Amber",
  //           count: 9
  //         },
  //         {
  //           colour: "Green",
  //           count: 9
  //         }
  //       ]
  //     }
  //   ];

  // }
}
