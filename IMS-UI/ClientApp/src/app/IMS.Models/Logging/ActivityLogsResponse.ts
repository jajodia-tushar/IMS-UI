import { Response } from "../Shared/Response";
import { ActivityLogs } from "./ActivityLogs";
import { PagingInfo } from "../Shared/PagingInfo";

export class ActivityLogsResponse extends Response{
    public activityLogRecords: ActivityLogs[];
    public pagingInfo : PagingInfo;
}