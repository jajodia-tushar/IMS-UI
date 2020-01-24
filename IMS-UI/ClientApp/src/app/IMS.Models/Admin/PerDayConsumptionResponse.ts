import { Response } from "../Shared/Response";
import { DateWithItemQuantityMapping } from "./DateWithItemQuantityMapping";
import { PagingInfo } from "../Shared/PagingInfo";

export class PerDayConsumptionResponse extends Response {
    dateItemMapping : DateWithItemQuantityMapping[];
    pagingInfo : PagingInfo;
}