import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Shelf } from 'src/app/IMS.Models/Shelf/Shelf';
import { MatSort, MatPaginator, MatDialog, MatSnackBar, MatDialogConfig, MatTableDataSource } from '@angular/material';
import { ShelfService } from 'src/app/IMS.Services/Shelf/shelf.service';
import { showMessage } from 'src/app/IMS.Modules/shared/utils/snackbar';
import { ShelfListResponse } from 'src/app/IMS.Models/Shelf/ShelfListResponse';
import { ShelfManageDialogComponent } from '../shelf-manage-dialog/shelf-manage-dialog.component';

@Component({
  selector: 'app-shelf-list',
  templateUrl: './shelf-list.component.html',
  styleUrls: ['./shelf-list.component.css']
})
export class ShelfListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'code', 'actions'];
  ELEMENT_DATA: Shelf[];
  dataSource

  @Input() event: Shelf;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private shelfService: ShelfService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  async ngOnInit() {
    await this.setShelves();
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

  openAddShelfDialog() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = null;
    dialogConfig.panelClass = 'dialog-shelf-manage';
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(ShelfManageDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result == false) {
        showMessage(this.snackBar, 2, "Shelf Creation Failed", 'warn');
      }
      else if (result == "cancelled") {
        //don't show any message.
      }
      else {
        // this.ELEMENT_DATA.push(<Item>result);
        // this.dataSource.data = this.ELEMENT_DATA;
        this.setShelves();
        showMessage(this.snackBar, 2, "Shelf Was Created Successfully", 'success');
      }
    });
  }

  numberOfColumns() {
    //console.log(this.displayedColumns.length)
    return (this.displayedColumns.length - 1);
  }

  editShelfDetails(shelf: Shelf) {
    this.openShelfEditDialog(shelf);
  }

  openShelfEditDialog(data: Shelf) {
    let dialogConfig = new MatDialogConfig();
    //console.log(data)
    dialogConfig.data = data;
    dialogConfig.panelClass = 'dialog-shelf-manage';
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(ShelfManageDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result == false) {
        showMessage(this.snackBar, 2, "Shelf Updation Failed", 'warn');
      }
      else if (result == "cancelled") {
        //don't show any message.
        // result.getElementBy('editShelfDetails').focus();
      }
      else {
        this.editShelfInTable(result);
      }

    });
  }

  // deactivateShelf(shelf) {
  //   let dialogConfig = new MatDialogConfig();
  //   dialogConfig.data = shelf;
  //   dialogConfig.panelClass = 'dialog-shelf-manage'
  //   const dialogRef = this.dialog.open(ShelfDeactivateDialogComponent, dialogConfig);

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result == true) {
  //       this.removeShelfFromTableById(shelf.id);
  //       showMessage(this.snackBar, 2, "Shelf was Deleted Successfully", 'success');
  //     }
  //     else if (result == false) {
  //       showMessage(this.snackBar, 2, "Deleting Shelf failed", 'warn');
  //     }
  //     else if (result == "cancelled") {
  //       //don't show any message.
  //     }
  //   });
  // }

  removeShelfFromTableById(id) {
    for (var index = 0; index < this.ELEMENT_DATA.length; index++) {
      if (this.ELEMENT_DATA[index].id === id) {
        this.ELEMENT_DATA.splice(index, 1);
      }
    }
    this.dataSource.data = this.ELEMENT_DATA;
  }

  editShelfInTable(shelf) {
    console.log(Shelf)
    for (var index = 0; index < this.ELEMENT_DATA.length; index++) {
      if (this.ELEMENT_DATA[index].id === shelf.id) {
        this.ELEMENT_DATA[index] = shelf;
        break;
      }
    }
    this.dataSource.data = this.ELEMENT_DATA;
    showMessage(this.snackBar, 2, "Shelf Details Updated Successfully", 'success');
  }

  setShelves() {

    this.shelfService.getAllShelves().subscribe(
      data => {
        let shelflist: Shelf[];
        shelflist = data.shelves;
        console.log(data);
        this.ELEMENT_DATA = shelflist;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    )
    //let shelflist: Shelf[] = (<ShelfListResponse>await this.shelfService.getAllShelves()).shelves;

  }
}
