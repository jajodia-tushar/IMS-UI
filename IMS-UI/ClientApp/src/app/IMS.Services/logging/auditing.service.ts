import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivityLogsResponse } from 'src/app/IMS.Models/Logging/ActivityLogsResponse';

@Injectable({
  providedIn: 'root'
})
export class AuditingService {

  constructor(private http: HttpClient) { }

  getActivityLogs(pageSize?,pageNumber?, fromDate?, toDate?){
    let params = {
      toDate: "",
      fromDate: "",
      pageSize: "",
      pageNumber: ""
    }
    if(pageSize){
      params.pageSize = pageSize;
    }
    if(pageNumber){
      params.pageNumber = pageNumber;
    }
    if(fromDate){
      params.fromDate = fromDate;
    }
    if(toDate){
      params.toDate = toDate;
    }
    
    return this.http.get<ActivityLogsResponse>("api/activityLogs",
    {
      params: params
    }
    );
  }
  
}
