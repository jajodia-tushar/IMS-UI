using IMS_UI.IMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Providers.Interfaces
{
    public interface IEmployeeProvider
    {
        Task<EmployeeResponse> ValidateEmployee(string employeeId);
        Task<UsersResponse> GetAllEmployee();
        Task<UsersResponse> AddEmployee(Employee employee);
        Task<UsersResponse> EditEmployee(Employee employee);
    }
}
