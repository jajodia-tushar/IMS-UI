using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string MobileNumber { get; set; }
        public string TCardNo { get; set; }
        public string AccessCardNo { get; set; }
        public bool IsActive { get; set; }
    }
}
