using IMS_UI.IMS.Models;
using System.Threading.Tasks;

namespace IMS_UI.IMS.Providers.Interfaces
{
    public interface IRolesProvider
    {
        Task<RolesResponse> GetAllRoles();
    }
}
