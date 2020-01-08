import { Component, OnInit, Input, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { StoreService } from 'src/app/IMS.Services/admin/store.service';
import { StoreResponse, PagingInformation } from 'src/app/IMS.Models/Admin/StockStatusResponse';
import { MatDialogConfig, MatDialog, MatDialogRef, MatSnackBar, PageEvent, MatTableDataSource, MatPaginator } from '@angular/material';
import { StoreUpdateComponent } from '../store-update/store-update.component';
import { SnackbarComponent } from 'src/app/IMS.Modules/shared/snackbar/snackbar.component';
import { showMessage } from "src/app/IMS.Modules/shared/utils/snackbar";
import { pairs } from 'rxjs';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  // dataSource: StoreResponse[] = [];
  dataSource: StoreResponse[] = [];
  // source: MatTableDataSource<StoreResponse> = new MatTableDataSource<StoreResponse>([]);
  columns: string[] = [];
  columnsToDisplay: string[] = [];
  snackbarMessage: string = "";

  pageSizeOptions: number[] = [5, 10, 15, 20];
  // pageEvent: PageEvent;

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

  constructor(private storeService: StoreService, public dialog: MatDialog, private snackBar: MatSnackBar) {

  }

  pageChange(event) {

    this.storeService.getAdminStoreStatus(event.pageIndex + 1, event.pageSize).subscribe(
      data => {
        this.pageSize = data.pagingInfo.pageSize.toString();
        this.pageLength = data.pagingInfo.totalResults.toString();

        this.getStoreData(data);
      },
      error => {
        console.log(error);
      });
  }



  ngOnInit() {
    this.dataSource = [];
    this.pageInfo = new PagingInformation();
    this.pageInfo.pageSize = 10;
    this.pageInfo.pageNumber = 1;
    this.pageInfo.totalResults = 100;
    this.pageLength = "0";
    this.pageSize = "10";
    console.log(this.dataSource);

    this.storeService.getAdminStoreStatus(this.pageInfo.pageNumber, this.pageInfo.pageSize).subscribe(
      data => {
        this.pageInfo = new PagingInformation();
        this.pageInfo.pageNumber = data.pagingInfo.pageNumber;
        this.pageInfo.pageSize = data.pagingInfo.pageSize;
        this.pageInfo.totalResults = data.pagingInfo.totalResults;

        this.pageLength = data.pagingInfo.totalResults.toString();
        this.pageSize = data.pagingInfo.pageSize.toString();

        this.getStoreData(data);
      });
  }


  editStore(item) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = "40%";
    dialogConfig.height = "auto";
    dialogConfig.data = item;
    dialogConfig.autoFocus = true;
    console.log(dialogConfig.data);
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

    this.storeService.getAdminStoreStatus(this.pageInfo.pageNumber, this.pageInfo.pageSize).subscribe(
      data => {
        this.pageInfo = new PagingInformation();
        this.pageInfo.pageNumber = data.pagingInfo.pageNumber;
        this.pageInfo.pageSize = data.pagingInfo.pageSize;
        this.pageInfo.totalResults = data.pagingInfo.totalResults;

        this.pageLength = data.pagingInfo.totalResults.toString();
        this.pageSize = data.pagingInfo.pageSize.toString();

        this.getStoreData(data);
      });


    // this.dataSource.forEach(element => {
    //   if (element["Item Name"] == result.itemName) {
    //     if (element[result.shelf] == '-')
    //       element[result.shelf] = result.quantity;
    //     else
    //       element[result.shelf] += result.quantity;
    //     element["Warehouse"] -= result.quantity;
    //   }
    // });
  }



  canTransfer(element) {
    if (element['Warehouse'] == 0 || element['Warehouse'] == '-')
      return false;
    else
      return true;
  }

  getStoreData(data) {
    this.columns = [];
    this.columnsToDisplay = [];
    this.dataSource = [];
    try {
      this.columns.push("Item Name");
      this.columns.push("Warehouse");
      if (data.stockStatusList == null)
        throw new Error("Internal server error");
      this.pageInfo = data.pageInfo;
      data.stockStatusList.forEach(element => {
        let stockColourQuantity = element.storeStatus;
        if (stockColourQuantity != null) {
          stockColourQuantity.forEach(child => {
            if (!this.columns.includes(child.location)) {
              this.columns.push(child.location);
              console.log(child.location);
            }
          });
        }
      });
      console.log(this.columns);

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
        this.dataSource.push(object);

        if (!this.numberOfItems) {
          this.columnsToDisplay = this.columns.concat(['actions']);
        }
        else
          this.columnsToDisplay = this.columns;
      });
    }
    catch (error) {
      console.log(error);
    }
  }
}
