import { SnackbarComponent } from "../snackbar/snackbar.component";

export function showMessage(time,message,type="message",snackBar){
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