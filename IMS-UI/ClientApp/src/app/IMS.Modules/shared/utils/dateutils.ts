export class DateUtils{
   static dateFormatter(inputDate : Date){
        return inputDate.toISOString().slice(0, 10).split("-").join("");
      }
}