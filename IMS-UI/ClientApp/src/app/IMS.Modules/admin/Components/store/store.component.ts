import { Component, OnInit, Input, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { StoreService } from 'src/app/IMS.Services/admin/store.service';
import { StoreResponse, PagingInformation } from 'src/app/IMS.Models/Admin/StockStatusResponse';
import { MatDialogConfig, MatDialog, MatDialogRef, MatSnackBar, PageEvent, MatTableDataSource, MatPaginator } from '@angular/material';
import { StoreUpdateComponent } from '../store-update/store-update.component';
import { showMessage } from "src/app/IMS.Modules/shared/utils/snackbar";
import { ShelfService } from 'src/app/IMS.Services/Shelf/shelf.service';
import { ShelfListResponse } from 'src/app/IMS.Models/Shelf/ShelfListResponse';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  dataSource: MatTableDataSource<StoreResponse> = new MatTableDataSource<StoreResponse>();
  columns: string[] = [];
  columnsToDisplay: string[] = [];
  snackbarMessage: string = "";

  pageSizeOptions: number[] = [10, 50, 100];

  paginator: MatPaginator;


  @ViewChild(MatPaginator, { static: true }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
  }

  pageLength: string;
  pageSize: string;

  @Output()
  paginatorClicked: EventEmitter<any> = new EventEmitter();

  @Input()
  numberOfItems: string;
  pageInfo: PagingInformation = new PagingInformation();

  constructor(private storeService: StoreService, public dialog: MatDialog,
    private snackBar: MatSnackBar, private shelfService: ShelfService) {

  }

  pageChange(event) {

    this.storeService.getAdminStoreStatus(event.pageIndex + 1, event.pageSize).subscribe(
      data => {
        this.pageSize = data.pagingInfo.pageSize.toString();
        this.pageLength = data.pagingInfo.totalResults.toString();

        this.getStoreData(data);
      });
  }



  async ngOnInit() {
    this.dataSource.data = [];
    this.pageInfo = new PagingInformation();
    this.pageInfo.pageSize = 10;
    this.pageInfo.pageNumber = 1;
    this.pageInfo.totalResults = 100;
    this.pageLength = "0";
    this.pageSize = "10";

    this.columns.push("Item Name");
    this.columns.push("Warehouse");

    let shelfList: ShelfListResponse = await this.shelfService.getAllShelves().toPromise();

    shelfList.shelves.forEach(shelf => {
      this.columns.push(shelf.name);
    })

    this.columns = this.columns.slice(0, 2).concat(this.columns.slice(2, this.columns.length).sort());


    this.storeService.getAdminStoreStatus(this.pageInfo.pageNumber, this.pageInfo.pageSize).subscribe(data => {
      this.pageInfo = new PagingInformation();
      this.pageInfo.pageNumber = data.pagingInfo.pageNumber;
      this.pageInfo.pageSize = data.pagingInfo.pageSize;
      this.pageInfo.totalResults = data.pagingInfo.totalResults;
      this.pageLength = data.pagingInfo.totalResults.toString();
      this.pageSize = data.pagingInfo.pageSize.toString();
      this.getStoreData(data);
    });
  }

  applyFilter(filterValue) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }

  }


  editStore(item) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = "auto";
    dialogConfig.height = "auto";
    dialogConfig.panelClass = 'dialog-edit-store';
    dialogConfig.data = item;
    dialogConfig.autoFocus = true;
    let dialogRef = this.dialog.open(StoreUpdateComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      result => {
        if (result == null) {
          dialogRef.close();
        }
        else {
          if (result.status == "Failure") {
            this.snackbarMessage = "Transfer Failed";
            showMessage(this.snackBar, 2, this.snackbarMessage, "message");
            dialogRef.close();
          }
          else {
            this.editItem(result);
            this.snackbarMessage = "Transfer Successful";
            showMessage(this.snackBar, 2, this.snackbarMessage, "success");
            dialogRef.close();
          }
        }
      },
      error => {
        this.snackbarMessage = "Transfer Failed";
        dialogRef.close();
        showMessage(this.snackBar, 2, this.snackbarMessage, "warn");
      });
  }

  editItem(result) {

    this.dataSource.data.forEach(element => {
      if (element["Item Name"] == result.itemName) {
        if (element[result.shelf] == '-')
          element[result.shelf] = result.quantity;
        else
          element[result.shelf] += result.quantity;
        element["Warehouse"] -= result.quantity;
      }
    });
  }



  canTransfer(element) {
    if (element['Warehouse'] == 0 || element['Warehouse'] == '-')
      return false;
    else
      return true;
  }

  getStoreData(data) {
    this.dataSource.data = [];
    try {
      data.stockStatusList.forEach(element => {
        let object = new StoreResponse();
        this.columns.forEach(child => {
          object[child] = '-';
        });
        object['Item Name'] = element.item.name;
        let stockColourQuantity = element.storeStatus;
        if (stockColourQuantity != null) {
          stockColourQuantity.forEach(child => {
            object[child.location] = child.quantity;
          });
        }
        this.dataSource.data.push(object);

        if (!this.numberOfItems) {
          this.columnsToDisplay = this.columns.concat(['actions']);
        }
        else
          this.columnsToDisplay = this.columns;
      });
    }
    catch (error) {
      showMessage(this.snackBar, 5, error, "warn");
    }

    this.dataSource.data = JSON.parse(JSON.stringify(this.dataSource.data));
  }

}
