import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Shelf } from 'src/app/IMS.Models/Shelf/Shelf';
import { CentralizedDataService } from 'src/app/IMS.Services/shared/centralized-data.service';
import { ShelfService } from 'src/app/IMS.Services/Shelf/shelf.service';


@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.css']
})
export class FloorComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FloorComponent>, private router: Router
    ,private shelfService : ShelfService,private centralizedDataRepo : CentralizedDataService) { }
    selectedShelf : Shelf;
    shelves : Shelf[] = [];

  ngOnInit() {
    this.shelfService.getAllShelves().subscribe( o => {
      this.shelves = JSON.parse(JSON.stringify(o.shelves));
    });
  }  
  async onSubmit() {
    this.dialogRef.close();
    if (this.selectedShelf != null){
      this.shelfService.setShelf(this.selectedShelf);
      this.centralizedDataRepo.setShelf(this.selectedShelf);
      this.router.navigate(['Shelf']);
    }
    else{
      this.router.navigateByUrl('/login');
    }
  }
}
