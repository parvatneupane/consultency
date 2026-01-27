
import AdminLayout from "../AdminLayout";
 export default  function ViewEmployee ()
 {
   return (
   <AdminLayout>
    <div>
      <h2 className="text-2xl font-bold"> View Employee</h2>
      <table className="w-full mt-4 border border-gray-400 border-collapse">
  <thead>
    <tr >
      <th className="border border-gray-400 px-4 py-2 text-left">Name</th>
      <th className="border border-gray-400 px-4 py-2 text-left">Mobile</th>
      <th className="border border-gray-400 px-4 py-2 text-left">Address</th>
      <th className="border border-gray-400 px-4 py-2 text-left">Status</th>
      <th className="border border-gray-400 px-4 py-2 text-left">Action</th>
    </tr>
  </thead>
                <tbody>
                    <tr>
                <td> </td>
                </tr>
                </tbody>
            </table>
            
    </div>
    </AdminLayout>
   );

 }