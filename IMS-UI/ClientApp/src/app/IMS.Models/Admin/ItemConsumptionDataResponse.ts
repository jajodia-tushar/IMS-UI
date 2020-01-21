import { Response } from "../Shared/Response";
import { DataMapping } from "./DataMapping";
import { PagingInfo } from "../Shared/PagingInfo";

export class ItemConsumptionDataResponse extends Response {
    dateItemMapping : DataMapping[];
    pagingInfo : PagingInfo;
}