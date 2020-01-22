import { EmployeeOrderMapping } from "./EmployeeOrderMapping";
import { PagingInfo } from "../Shared/PagingInfo";
import { Response } from "../Response";

export class EmployeeOrdersResponse extends Response{
    employeeOrders: EmployeeOrderMapping[];
    pagingInfo : PagingInfo;
}