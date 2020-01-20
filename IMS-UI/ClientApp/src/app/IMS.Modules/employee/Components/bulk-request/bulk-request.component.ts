import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Employee } from 'src/app/IMS.Models/Employee/Employee';

@Component({
  selector: 'app-bulk-request',
  templateUrl: './bulk-request.component.html',
  styleUrls: ['./bulk-request.component.css']
})
export class BulkRequestComponent implements OnInit {
  hasRequestedItems: boolean = false;

  minDate: Date = new Date();

  employeeID: string;
  constructor(public dialogRef: MatDialogRef<BulkRequestComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public datas: Employee) {
      this.employeeID = datas.id;
  }

  ngOnInit() {
  }

  Send() {
    console.log("request sent");
    this.dialogRef.close();
  }

  CancelRequest() {
    console.log("Request canceled");
    this.dialogRef.close();
  }
}
