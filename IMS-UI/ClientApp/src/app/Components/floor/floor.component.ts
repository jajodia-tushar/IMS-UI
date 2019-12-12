import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Shelf } from 'src/app/IMS.Models/ShelfResponse';
import { ShelfService } from 'src/app/IMS.Services/shelf.service';
import { SessionService } from 'src/app/IMS.Services/session.service';


@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.css']
})
export class FloorComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FloorComponent>, private router: Router
    ,private shelfService : ShelfService,private authService : SessionService) { }
    selected : Shelf;
    shelves : Shelf[] = [];

  ngOnInit() {
    this.shelfService.getAllShelves().subscribe( o => {
      this.shelves = JSON.parse(JSON.stringify(o.shelves));
    })
  }
  //this.display = true;  
  onSubmit() {
    this.dialogRef.close();
    console.log(this.selected)
    if (this.selected != null){
      this.authService.postShelfData(this.selected).subscribe(
        data =>{
          console.log(data);
        }
      );   // Adding the data to session --> Refresh Prevention
      this.router.navigate(['Shelf']);
    }
    else{
      this.router.navigateByUrl('/login');
    }
  }
}
