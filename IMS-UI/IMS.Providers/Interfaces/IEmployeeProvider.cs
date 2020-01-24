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
        Task<EmployeesResponse> GetAllEmployee(string pageNumber, string pageSize);
        Task<EmployeesResponse> AddEmployee(Employee employee);
        Task<EmployeesResponse> EditEmployee(Employee employee);

        Task<Response> DeactivateEmployee(string employeeId, bool isHardDelete);
    }
}
