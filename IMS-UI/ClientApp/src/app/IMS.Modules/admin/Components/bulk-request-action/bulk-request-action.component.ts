import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BulkRequestService } from 'src/app/IMS.Services/employee/bulk-request.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bulk-request-action',
  templateUrl: './bulk-request-action.component.html',
  styleUrls: ['./bulk-request-action.component.css']
})
export class BulkRequestActionComponent implements OnInit {

  constructor(private route : ActivatedRoute, private bulkRequestService:BulkRequestService, public datepipe: DatePipe) { }

  orderId:number;
  requestStatus:string;
  requestedBy:string;
  empId:string;
  requestMadeOnDate:string;
  requestedForDate:string;
  reasonForRequest:string;

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.orderId = +params.get("id");
      }
    )
    this.bulkRequestService.GetBulkOrderDetails(this.orderId).subscribe(
      data => {
        console.log(data);
        let _data = data.employeeBulkOrders[0];
        this.orderId = _data.bulkOrderId;
        this.requestStatus = _data.employeeBulkOrderDetails.bulkOrderRequestStatus;
        this.requestedBy = _data.employee.firstname +" "+_data.employee.lastname;
        this.empId = _data.employee.id;
        this.requestMadeOnDate = this.transformDate(_data.employeeBulkOrderDetails.createdOn);
        this.requestedForDate = this.transformDate(_data.employeeBulkOrderDetails.requirementDate);
        this.reasonForRequest = _data.employeeBulkOrderDetails.reasonForRequirement
      }
    )    
  }

  transformDate(data) { 
    return this.datepipe.transform(data,'dd/MM/yyyy');
  }

}
