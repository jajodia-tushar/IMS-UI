import { Component, OnInit, Input } from '@angular/core';
import { StoreService } from 'src/app/IMS.Services/admin/store.service';
import { StoreResponse } from 'src/app/IMS.Models/Admin/StockStatusResponse';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  dataSource: StoreResponse[] = [];
  columnsToDisplay: string[] = [];

  @Input()
  numberOfItems : string;

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.storeService.getAdminStoreStatus().subscribe(
      data => {
        this.columnsToDisplay.push("Item Name");
        if (data.stockStatusList == null)
          console.log("error");
        if(this.numberOfItems !=null){
          data.stockStatusList = data.stockStatusList.splice(1,10);
        }
        data.stockStatusList.forEach(element => {
          let stockColourQuantity = element.storeStatus;
          if (stockColourQuantity != null) {
            stockColourQuantity.forEach(child => {
              if (!this.columnsToDisplay.includes(child.storeName))
                this.columnsToDisplay.push(child.storeName);
            });
          }
        });

        data.stockStatusList.forEach(element => {
          let object = new StoreResponse();
          this.columnsToDisplay.forEach(child => {
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
        });
      },
      error => {
        console.log(error);        
      });
  }

}
