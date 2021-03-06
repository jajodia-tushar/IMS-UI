using IMS_UI.IMS.Models;
using IMS_UI.IMS.Models.Admin;
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
        Task<EmployeeBulkOrdersResponse> GetEmployeeBulkOrderById(int orderId);
        Task<Response> CancelEmployeeBulkOrder(int orderId);
        Task<Response> RejectEmployeeBulkOrder(int orderId);
        Task<ApproveBulkOrderResponse> ApproveEmployeeBulkOrder(int orderid, ApproveEmployeeBulkOrder approveEmployeeBulkOrder);
        Task<StockStatusResponse> GetStockStatus(int pageNumber, int pageSize, string itemIds);
        Task<EmployeeBulkOrdersResponse> ReturnBulkOrderById(int orderId, EmployeeBulkOrder employeeBulkOrder);
    }
}
