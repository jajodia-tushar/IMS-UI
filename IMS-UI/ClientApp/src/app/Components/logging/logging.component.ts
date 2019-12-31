import { Component, OnInit } from '@angular/core';
import { LoggingService } from 'src/app/IMS.Services/logging/logging.service';
import { LogsResponse } from 'src/app/IMS.Models/Logging/LogsResponse';
import { Logs } from 'src/app/IMS.Models/Logging/logs';
import { trigger, state, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class LoggingComponent implements OnInit {
  
  displayedColumns: string[] = ['logId','userId', 'callType', 'severity', 'status', 'dateTime'];
  dataSource: Logs[];
  expandedElement: Logs | null;


  constructor(private loggingService: LoggingService) { }

  async ngOnInit() {
  this.dataSource = (<LogsResponse> await this.loggingService.getAllLogs()).logsRecords;
  }

}
