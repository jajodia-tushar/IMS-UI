import { Component, OnInit, Input } from '@angular/core';
import { StoreService } from 'src/app/IMS.Services/admin/store.service';
import { StoreResponse } from 'src/app/IMS.Models/Admin/StockStatusResponse';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { StoreUpdateComponent } from '../store-update/store-update.component';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  dataSource: StoreResponse[] = [];
  columns: string[] = [];
  columnsToDisplay: string[] = [];

  @Input()
  numberOfItems: string;

  constructor(private storeService: StoreService, public dialog: MatDialog) { }

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

          if(!this.numberOfItems)  {
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
    console.log(item);
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = "50%";
    dialogConfig.data = item;
    dialogConfig.autoFocus = true;
    console.log(dialogConfig.data);
    let dialogRef = this.dialog.open(StoreUpdateComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      result => {
        console.log(result);  
      });
  }
}