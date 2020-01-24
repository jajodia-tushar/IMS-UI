import { Response } from "../Shared/Response";
import { DataMapping } from "./DataMapping";
import { PagingInfo } from "../Shared/PagingInfo";

export class PerDayConsumptionResponse extends Response {
    dateItemMapping : DataMapping[];
}