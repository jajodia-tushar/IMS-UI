import { Component, OnInit, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
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
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.isLoading.next();
    
  }

  mode = 'indeterminate';
 
}
