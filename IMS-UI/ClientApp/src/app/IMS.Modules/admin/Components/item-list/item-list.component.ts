import { ItemService } from 'src/app/IMS.Services/item/item.service';
import { ItemsResponse } from './../../../../IMS.Models/Item/ItemsResponse';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog, MatDialogConfig, MatSnackBar, MatPaginator } from '@angular/material';
import { Item } from 'src/app/IMS.Models/Item/Item';
import { ItemManageDialogComponent } from '../item-manage-dialog/item-manage-dialog.component';
import { ItemDeactivateDialogComponent } from '../item-deactivate-dialog/item-deactivate-dialog.component';
import { showMessage } from 'src/app/IMS.Modules/shared/utils/snackbar';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'maxLimit', 'rate', 'shelvesRedLimit', 'shelvesAmberLimit', 'warehouseRedLimit', 'warehouseAmberLimit', 'actions'];
  ELEMENT_DATA: Item[];
  dataSource

  @Input() event: Item;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private itemService: ItemService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  async ngOnInit() {
    await this.setItems();

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
  }

  sortingDataAccessor(item, property) {
    if (property.includes('.')) {
      return property.split('.')
        .reduce((object, key) => object[key], item);
    }
    return item[property];
  }

  openAddItemDialog() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = null;
    dialogConfig.panelClass = 'dialog-item-manage';
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(ItemManageDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result == false) {
        showMessage(this.snackBar, 2, "Item Creation Failed", 'warn');
      }
      else if (result == "cancelled") {
      }
      else {
        this.setItems();
        showMessage(this.snackBar, 2, "Item Was Created Successfully", 'success');
      }
    });
  }

  numberOfColumns() {
    return (this.displayedColumns.length - 1);
  }

  editItemDetails(item: Item) {
    this.openItemEditDialog(item);
  }

  openItemEditDialog(data: Item) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = data;
    dialogConfig.panelClass = 'dialog-item-manage';
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(ItemManageDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result == false) {
        showMessage(this.snackBar, 2, "Item Updation Failed", 'warn');
      }
      else if (result == "cancelled") {
        result.getElementById('editItemDetails').focus();
      }
      else {
        this.editItemInTable(result);
      }

    });
  }

  deactivateItem(item) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = item;
    dialogConfig.panelClass = 'dialog-item-manage'
    const dialogRef = this.dialog.open(ItemDeactivateDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.removeItemFromTableById(item.id);
        showMessage(this.snackBar, 2, "Item was Deleted Successfully", 'success');
      }
      else if (result == false) {
        showMessage(this.snackBar, 2, "Deleting Item failed", 'warn');
      }
      else if (result == "cancelled") {
      }
    });
  }

  removeItemFromTableById(id) {
    for (var index = 0; index < this.ELEMENT_DATA.length; index++) {
      if (this.ELEMENT_DATA[index].id === id) {
        this.ELEMENT_DATA.splice(index, 1);
      }
    }
    this.dataSource.data = this.ELEMENT_DATA;
  }

  editItemInTable(item) {
    for (var index = 0; index < this.ELEMENT_DATA.length; index++) {
      if (this.ELEMENT_DATA[index].id === item.id) {
        this.ELEMENT_DATA[index] = item;
        break;
      }
    }
    this.dataSource.data = this.ELEMENT_DATA;
    showMessage(this.snackBar, 2, "Item Details Updated Successfully", 'success');
  }

  async setItems() {
    let itemlist: Item[] = (<ItemsResponse>await this.itemService.getAllItem()).items;
    this.ELEMENT_DATA = itemlist;
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
