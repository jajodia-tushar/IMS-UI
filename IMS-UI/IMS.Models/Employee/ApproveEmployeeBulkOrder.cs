using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models
{
    public class ApproveEmployeeBulkOrder : EmployeeBulkOrder
    {
         public List<ItemLocationQuantityMapping> ItemLocationQuantityMappings { get; set; }
    }
}
