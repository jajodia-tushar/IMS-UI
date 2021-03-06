import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Shelf } from 'src/app/IMS.Models/Shelf/Shelf';
import { CentralizedDataService } from 'src/app/IMS.Services/shared/centralized-data.service';
import { ShelfService } from 'src/app/IMS.Services/Shelf/shelf.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.css']
})
export class FloorComponent implements OnInit {

  constructor(private router: Router
    ,private shelfService : ShelfService,private centralizedDataRepo : CentralizedDataService,
    private dialogRef: MatDialogRef<FloorComponent>,) { }
    selectedShelf : Shelf;
    shelves : Shelf[] = [];

    isFloorNotSelected : boolean = true;


  ngOnInit() {
    this.shelfService.getAllShelves().subscribe( o => {
      this.shelves = JSON.parse(JSON.stringify(o.shelves));
    });
  }

  async onSubmitShelf(shelf) {
    this.selectedShelf = shelf;
    if (this.selectedShelf != null){
      this.shelfService.setShelf(this.selectedShelf);
      this.centralizedDataRepo.setShelf(this.selectedShelf);
      this.router.navigate(['Shelf']);
      this.isFloorNotSelected = false;
      this.dialogRef.close(true);
    }
    else{
      this.router.navigateByUrl('/login');
    }
  }
}
