import { SnackbarComponent } from "../snackbar/snackbar.component";
import { MatSnackBar } from "@angular/material";

export function showMessage(snackBar: MatSnackBar, time: number, message: string, type = "message") {
  let extraClasses = ['snackbar-message'];
  if (type == 'warn') {
    extraClasses = ['snackbar-warn'];
  }
  else if(type=='success'){
    extraClasses = ['snackbar-success'];
  }
  else if(type=='message'){
    extraClasses = ['snackbar-message'];
  }
  snackBar.openFromComponent(SnackbarComponent, {
    duration: 1000 * time,
    panelClass: extraClasses,
    data: { message: message }
  });
}