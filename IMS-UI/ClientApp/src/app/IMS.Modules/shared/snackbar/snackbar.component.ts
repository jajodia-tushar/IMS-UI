import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styles: [`
  .example-pizza-party {
    color: hotpink;
  }
`],
})
export class SnackbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
