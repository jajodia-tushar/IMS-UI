import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.css']
})
export class ImageDialogComponent implements OnInit {

  imageURL : string = "";
  constructor(private dialogRef: MatDialogRef<ImageDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.imageURL = "../../../../../../../" + data;
  }

  ngOnInit() {
    
  }
  cancelClikced(){
    this.dialogRef.close();
  }
}
