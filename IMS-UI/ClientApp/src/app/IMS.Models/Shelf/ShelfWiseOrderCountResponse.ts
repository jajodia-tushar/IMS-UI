export class ShelfWiseOrderCountResponse {
  dateWiseShelfOrderCount : DateShelfOrderMapping[];
  status : string;
  error : Error;
}

export class DateShelfOrderMapping{
    date : string;
    shelfOrderCountMappings :  ShelfOrderCountMapping[];

}

export class ShelfOrderCountMapping{
  shelfName : string;
  totalNumberOfOrder : number;
}
