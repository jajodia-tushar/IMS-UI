import { SnackbarComponent } from "../snackbar/snackbar.component";
import { MatSnackBar } from "@angular/material";

export function showMessage(snackBar: MatSnackBar, time: number, message:string, type="message"){
    let extraClasses;
      if (type == 'error') {
     extraClasses = ['snackbar-background-red'];
   } else {
     extraClasses = ['snackbar-background-green'];
   }
    snackBar.openFromComponent(SnackbarComponent, {
      duration: 1000 * time ,
      panelClass : extraClasses,
      data : { message : message }
    });
  }