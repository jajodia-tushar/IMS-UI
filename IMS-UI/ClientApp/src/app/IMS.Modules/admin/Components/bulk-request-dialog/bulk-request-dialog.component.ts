import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-bulk-request-dialog',
  templateUrl: './bulk-request-dialog.component.html',
  styleUrls: ['./bulk-request-dialog.component.css']
})
export class BulkRequestDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<BulkRequestDialogComponent>, @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
  }

}
