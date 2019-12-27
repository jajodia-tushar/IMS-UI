using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models.Logging
{
    public class LogsResponse : Response
    {
        public List<Logs> LogsRecords { get; set; }
    }
}
