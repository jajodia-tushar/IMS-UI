import { Component, OnInit } from '@angular/core';
import { LoggingService } from 'src/app/IMS.Services/logging/logging.service';
import { LogsResponse } from 'src/app/IMS.Models/Logging/LogsResponse';
import { Logs } from 'src/app/IMS.Models/Logging/logs';

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css']
})
export class LoggingComponent implements OnInit {
  
  displayedColumns: string[] = ['id','userId', 'callType', 'request', 'response', 'severity', 'status', 'dateTime'];
  dataSource: Logs[];

  constructor(private loggingService: LoggingService) { }

  async ngOnInit() {
    this.dataSource = [{
      id: 1,
      userId:123,
      callType:"Example Text Hello BBc this is sample text hello vysldjfsldflsdjfl",
      request:"Example Text Hello BBc this is sample text hello vysldjfsldflsdjfl",
      response:"Example Text Hello BBc this is sample text hello vysldjfsldflsdjfl",
      severity:"Example Text Hello BBc this is sample text hello vysldjfsldflsdjfl",
      status:"Example Text Hello BBc this is sample text hello vysldjfsldflsdjfl",
      dateTime:new Date()
    }
   ]
  // this.dataSource = (<LogsResponse> await this.loggingService.getAllLogs()).logsRecords;
  }

}
