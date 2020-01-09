export class DateUtils{
   static dateFormatter(inputDate : Date){
        return `${inputDate.getFullYear()}${("0" + (inputDate.getMonth() + 1)).slice(-2)}${("0"+inputDate.getDate()).slice(-2)}`;
      }
}
