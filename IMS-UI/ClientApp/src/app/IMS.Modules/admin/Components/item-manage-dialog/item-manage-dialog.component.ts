import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-item-manage-dialog',
  templateUrl: './item-manage-dialog.component.html',
  styleUrls: ['./item-manage-dialog.component.css']
})
export class ItemManageDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) data) {
    console.log(data)
  }
  ngOnInit() { }
}
