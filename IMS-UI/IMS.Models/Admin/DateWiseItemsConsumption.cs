using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models.Admin
{
    public class DateWiseItemsConsumption : Response
    {
        public List<DateItemsMapping> DateItemMapping { get; set; }

        public PagingInfo pagingInfo { get; set; }
    }
}
