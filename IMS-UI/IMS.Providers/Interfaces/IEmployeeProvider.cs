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
        Task<EmployeesResponse> GetAllEmployee(string filter,string pageNumber, string pageSize);
        Task<EmployeesResponse> AddEmployee(Employee employee);
        Task<EmployeesResponse> EditEmployee(Employee employee);

        Task<Response> DeactivateEmployee(string employeeId, bool isHardDelete);
        Task<Response> IsUniqueEmployeeEmail(string email);
        Task<Response> IsUniqueEmployeeId(string employeeId);
        Task<EmployeeOrdersResponse> GetEmployeeOrders(string toDate, string fromDate, string pageNumber, string pageSize, string employeeId);
        Task<EmployeeBulkOrdersResponse> PostBulkOrder(EmployeeBulkOrder employeeBulkOrder);
        Task<EmployeeOrderResponse> PostOrders(EmployeeOrder placeEmployeeOrderRequest);
    }
}
