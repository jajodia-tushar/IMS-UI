using IMS_UI.IMS.Models.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models.Logging
{
    public class ActivityLogsResponse:Response
    {
        public List<ActivityLogs> ActivityLogRecords { get; set; }
        public PagingInfo PagingInfo { get; set; }
    }
}
