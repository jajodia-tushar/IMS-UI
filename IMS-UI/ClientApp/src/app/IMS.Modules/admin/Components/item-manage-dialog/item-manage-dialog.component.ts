import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Item } from 'src/app/IMS.Models/Item/Item';


@Component({
  selector: 'app-item-manage-dialog',
  templateUrl: './item-manage-dialog.component.html',
  styleUrls: ['./item-manage-dialog.component.css']
})
export class ItemManageDialogComponent implements OnInit {
  itemData: Item;
  constructor(@Inject(MAT_DIALOG_DATA) data) {
    this.itemData = data;
    console.log(data)
  }
  ngOnInit() { }
}
