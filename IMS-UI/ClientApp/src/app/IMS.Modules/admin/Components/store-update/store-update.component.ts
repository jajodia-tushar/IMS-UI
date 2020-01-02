import { Component, OnInit, Inject, Optional } from '@angular/core';
import { ShelfService } from 'src/app/IMS.Services/Shelf/shelf.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { StoreResponse } from 'src/app/IMS.Models/Admin/StockStatusResponse';
import { TransferService } from 'src/app/IMS.Services/Shelf/transfer.service';
import { Shelf } from 'src/app/IMS.Models/Shelf/Shelf';
import { CartItem } from 'src/app/IMS.Models/CartItem';

@Component({
  selector: 'app-store-update',
  templateUrl: './store-update.component.html',
  styleUrls: ['./store-update.component.css']
})
export class StoreUpdateComponent implements OnInit {
  itemName: string;
  itemQuantityAtForstFloor = '';
  itemQuantityAtSixthFloor = '';
  shelves = [];
  selectedFloor: string;

  transferRequest: TransferRequest = {
    shelvesItemsQuantityList: [
      {
        shelf: {
          id: 1
        },
        itemQuantityMapping: [
          {
            item: {
              id: 1
            },
            quantity: 10
          }
        ]
      }
    ]
  };

  constructor(private shelfService: ShelfService, public dialogRef: MatDialogRef<StoreUpdateComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public datas: StoreResponse, private transferService: TransferService) {
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


  }

  closeDialog() {
    this.dialogRef.close();
  }

  onUpdate(element) {
    console.log(this.transferRequest);
    
    this.transferService.transferToShelf(this.transferRequest).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

}



export class TransferRequest {
  shelvesItemsQuantityList: ShelvesItemsQuantityList[];
}


export class ShelvesItemsQuantityList {
  shelf: ShelfID;
  itemQuantityMapping: CartItemID[];
}

export class ShelfID {
  id: number;
}

export class CartItemID  {
  item: ItemID;
  quantity: number;
}

export class ItemID  {
  id: number;
}