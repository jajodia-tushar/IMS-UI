using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models.Admin
{
    public class ItemConsumptionDetailsResponse : Response
    {
        public List<DateWiseItemConsumptionDetails> DateWiseItemConsumptionDetails { get; set; }
        public PagingInfo PagingInfo { get; set; }
    }
}
