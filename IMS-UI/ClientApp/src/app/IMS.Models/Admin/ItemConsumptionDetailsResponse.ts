import { PagingInfo } from "../Shared/PagingInfo";
import { Item } from "../Item/Item";
import { Response } from "../Response";

export class ItemConsumptionDetailsResponse extends Response{
    dateWiseItemConsumptionDetails : DateWiseItemConsumptionDetails[];
    pagingInfo : PagingInfo
}

export class DateWiseItemConsumptionDetails {
    item : Item;
    dateItemConsumption : DateItemConsumptions[];
}

export class DateItemConsumptions{
    date : string;
    itemsConsumptionCount : number;
}