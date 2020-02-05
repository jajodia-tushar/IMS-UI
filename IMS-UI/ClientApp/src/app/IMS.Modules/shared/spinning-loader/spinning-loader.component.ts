import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { SpinLoaderService } from '../../../IMS.Services/shared/spin-loader.service';

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


  ngOnChanges(changes: SimpleChanges): void {
    this.isLoading.next();
    
  }

  mode = 'indeterminate';
 
}
