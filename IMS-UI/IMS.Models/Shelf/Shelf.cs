using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models
{
    public class Shelf
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string Code { get; set; }
        public bool IsActive { get; set; }
    }
}
