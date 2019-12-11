import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SpinLoaderService } from '../../../IMS.Services/spin-loader.service';

@Component({
  selector: 'app-spinning-loader',
  templateUrl: './spinning-loader.component.html',
  styleUrls: ['./spinning-loader.component.css']
})
export class SpinningLoaderComponent implements OnInit {

  constructor(private loaderService: SpinLoaderService) { }
  
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  
  ngOnInit() {
  }

  mode = 'indeterminate';
 
}
