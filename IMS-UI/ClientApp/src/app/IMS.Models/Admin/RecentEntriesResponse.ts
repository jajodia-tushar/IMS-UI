import { Employee } from "../Employee/Employee";
import { Error } from "../Error";
import { EmployeeOrderMapping } from "../Employee/EmployeeOrderMapping";
import { PagingInfo } from "../Shared/PagingInfo";

export class RecentEntriesResponse {
  employeeRecentOrders: EmployeeOrderMapping[];
  pagingInfo : PagingInfo;
  status: string;
  error: Error;
}
