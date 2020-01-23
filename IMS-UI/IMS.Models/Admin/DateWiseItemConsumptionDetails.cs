using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models.Admin
{
    public class DateWiseItemConsumptionDetails
    {
        public Item Item { get; set; }
        public List<DateItemConsumptionModel> DateItemConsumptions { get; set; }
    }
}
