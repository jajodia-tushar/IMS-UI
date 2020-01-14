import { ItemsResponse } from './../../../../IMS.Models/Item/ItemsResponse';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { ItemManagementService } from 'src/app/IMS.Services/admin/item-management.service';
import { Item } from 'src/app/IMS.Models/Item/Item';
import { ItemManageDialogComponent } from '../item-manage-dialog/item-manage-dialog.component';
import { ItemDeactivateDialogComponent } from '../item-deactivate-dialog/item-deactivate-dialog.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  displayedColumns: string[] = ['itemName', 'maxLimit', 'rate', 'shelfRedLimit', 'shelfAmberLimit', 'warehouseRedLimit', 'warehouseAmberLimit'];
  ELEMENT_DATA: Item[];
  dataSource

  @Input() event:Item;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private itemManagementService: ItemManagementService, public dialog: MatDialog) { }

  async ngOnInit() {
    await this.setItems();
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    //this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
    //this.dataSource.sort = this.sort;
    console.log(this.ELEMENT_DATA)
  }

  applyFilter(filterValue: string) {
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: any, filter) => {
    const dataStr = JSON.stringify(data).toLowerCase();
    return dataStr.indexOf(filter) != -1;
    }
  }

  // sortingDataAccessor(item, property) {
  //   if (property.includes('.')) {
  //     return property.split('.')
  //       .reduce((object, key) => object[key], item);
  //   }
  //   return item[property];
  // }

  editItemDetails(user) {
    console.log(user);
    // open same dialog box used for creating user
    this.openDialog(user);
  }

  openDialog(data) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = data;
    // dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(ItemManageDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deactivateItem(user) {
    console.log(user);
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = user;
    // dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(ItemDeactivateDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  async setItems(){
    let itemlist : Item[] =  (<ItemsResponse>await this.itemManagementService.getAllItems()).items;
    console.log("=======");
    console.log(itemlist);
    this.ELEMENT_DATA = itemlist;
  }
}
