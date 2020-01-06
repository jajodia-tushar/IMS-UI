import { Component, OnInit, Input } from '@angular/core';
import { StoreService } from 'src/app/IMS.Services/admin/store.service';
import { StoreResponse } from 'src/app/IMS.Models/Admin/StockStatusResponse';
import { MatDialogConfig, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { StoreUpdateComponent } from '../store-update/store-update.component';
import { SnackbarComponent } from 'src/app/IMS.Modules/shared/snackbar/snackbar.component';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  dataSource: StoreResponse[] = [];
  columns: string[] = [];
  columnsToDisplay: string[] = [];

  snackbarMessage: string = "";

  @Input()
  numberOfItems: string;

  constructor(private storeService: StoreService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.storeService.getAdminStoreStatus().subscribe(
      data => {
        this.columns.push("Item Name");
        if (data.stockStatusList == null)
          console.log("error");
        if (this.numberOfItems != null) {
          data.stockStatusList = data.stockStatusList.splice(1, 10);
        }
        data.stockStatusList.forEach(element => {
          let stockColourQuantity = element.storeStatus;
          if (stockColourQuantity != null) {
            stockColourQuantity.forEach(child => {
              if (!this.columns.includes(child.storeName))
                this.columns.push(child.storeName);
            });
          }
        });
        data.stockStatusList.forEach(element => {
          let object = new StoreResponse();
          this.columns.forEach(child => {
            object[child] = '-';
          });
          object['Item Name'] = element.item.name;
          let stockColourQuantity = element.storeStatus;
          if (stockColourQuantity != null) {
            stockColourQuantity.forEach(child => {
              object[child.storeName] = child.quantity;
            });
          }
          this.dataSource.push(object);

          if (!this.numberOfItems) {
            this.columnsToDisplay = this.columns.concat(['actions']);
          }
          else
            this.columnsToDisplay = this.columns;
        });

      },
      error => {
        console.log(error);
      });
  }

  editStore(item) {
    if(!this.canTransfer(item))  {
      this.showMessage(3, "Cannot Transfer the item");
    }
    else  {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = "50%";
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
          console.log(item);
          console.log(result);
          if (result.status == "Failure") {
            this.snackbarMessage = "Transfer Failed";
            dialogRef.close();
          }
          else {
            this.editItem(result);
            this.snackbarMessage = "Transfer Successful";
            dialogRef.close();
          }
          this.showMessage(3, this.snackbarMessage);
        }
      },
      error => {
        this.snackbarMessage = "Transfer Failed";
        dialogRef.close();
        this.showMessage(3, this.snackbarMessage);
      });
    }
  }

  editItem(result) {
    this.dataSource.forEach(element => {
      if (element["Item Name"] == result.itemName) {
        element[result.shelf] += result.quantity;
        element["Warehouse"] -= result.quantity;
      }
    });
  }

  showMessage(time, message) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 1000 * time, data: { message: message }
    });
  }


  canTransfer(element)  {
    if(element['Warehouse'] == 0 || element['Warehouse']=='-')
      return false;
    else
      return true;
  }
}