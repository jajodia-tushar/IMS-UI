import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { ItemManagementService } from 'src/app/IMS.Services/admin/item-management.service';
import { Item } from 'src/app/IMS.Models/Item/Item';
import { ItemManageDialogComponent } from '../item-manage-dialog/item-manage-dialog.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  displayedColumns: string[] = ['itemName', 'maxLimit', 'rate', 'shelfRedLimit', 'shelfAmberLimit', 'warehouseRedLimit', 'warehouseAmberLimit'];

  ELEMENT_DATA: Item[];
  dataSource

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private itemManagementService: ItemManagementService, public dialog: MatDialog) { }

  ngOnInit() {
    this.setItems();
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource.sort = this.sort;
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
  }

  async setItems() {
    // let items : Item[] =  await this.itemManagementService.getAllItems();
    let items: Item[] = [
      {id: 0, name: 'cloth', maxLimit: 50, isActive: true, imageUrl: '', rate: 5, shelvesRedLimit: 5, shelvesAmberLimit: 10, warehouseRedLimit: 10, warehouseAmberLimit: 20}
      ];
    console.log('set Items')
    this.ELEMENT_DATA = items;
  }

}
