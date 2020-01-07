import { Component, OnInit, Inject, Optional } from '@angular/core';
import { ShelfService } from 'src/app/IMS.Services/Shelf/shelf.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { StoreResponse } from 'src/app/IMS.Models/Admin/StockStatusResponse';
import { TransferService } from 'src/app/IMS.Services/Shelf/transfer.service';
import { Item } from 'src/app/IMS.Models/Item/Item';
import { ItemService } from 'src/app/IMS.Services/item/item.service';
import { TransferRequest, ShelfID, ItemID, CartItemID, ShelvesItemsQuantityList } from 'src/app/IMS.Models/Shelf/TransferRequest';
import { Status } from 'src/app/IMS.Models/Status';

@Component({
  selector: 'app-store-update',
  templateUrl: './store-update.component.html',
  styleUrls: ['./store-update.component.css']
})
export class StoreUpdateComponent implements OnInit {
  public itemName: string;
  shelves = [];
  selectedFloor: string;
  public quantity: string;
  itemsList: Item[] = [];
  error: boolean = false;

  transferRequest: TransferRequest = new TransferRequest();

  constructor(private shelfService: ShelfService, public dialogRef: MatDialogRef<StoreUpdateComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public datas: StoreResponse, private transferService: TransferService, private itemService: ItemService) {
    this.itemName = datas['Item Name'];
  }

  ngOnInit() {
    this.shelfService.getAllShelves().subscribe(
      data => {
        data.shelves.forEach(element => {
          this.shelves.push(element);
        });
      },
      error => {
        console.log(error);
      });

    this.itemService.getAllItems().subscribe(
      data => {
        data.items.forEach(element => {
          this.itemsList.push(element);
        });
      },
      error => {
        console.log(error);
      });
  }

  close() {
    this.dialogRef.close();
  }

  closeDialog(result) {
    this.dialogRef.close(result);
  }

  onUpdate(shelfName) {
    if (!parseInt(this.quantity)) {
      this.error = true;
    }
    else {
      let shelf: ShelfID = new ShelfID();
      this.shelves.forEach(element => {
        if (element.name == shelfName) {
          shelf.id = element.id;
        }
      });
      let item: ItemID = new ItemID();
      this.itemsList.forEach(element => {
        if (element.name == this.itemName) {
          item.id = element.id;
        }
      });

      let itemMapping: CartItemID = new CartItemID();
      itemMapping.item = item;
      itemMapping.quantity = parseInt(this.quantity);

      let request: ShelvesItemsQuantityList = new ShelvesItemsQuantityList();
      request.shelf = shelf;
      request.itemQuantityMapping = [];
      request.itemQuantityMapping.push(itemMapping);

      this.transferRequest.shelvesItemsQuantityList = [];
      this.transferRequest.shelvesItemsQuantityList.push(request);

      this.transferService.transferToShelf(this.transferRequest).subscribe(
        data => {
          console.log(data);
          let transferResponse: TransferResponse = new TransferResponse();
          transferResponse.itemName = this.itemName;
          transferResponse.quantity = parseInt(this.quantity);
          transferResponse.shelf = shelfName;
          transferResponse.status = data.status;
          this.dialogRef.close(transferResponse);
        },
        error => {
          this.closeDialog(false);
        });
      }
  }
}


export class TransferResponse {
  itemName: string;
  quantity: number;
  shelf: string;
  status: Status;
}