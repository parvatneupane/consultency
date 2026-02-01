
import AdminLayout from "../AdminLayout";
import { Link } from "react-router-dom";
import EmployeeCard from "../../components/admincomponents/EmployeeCard";

 export default  function Employee ()
 {
   return (
   <AdminLayout>

    <div className="flex justify-end">
      <Link
        to="/addemployee"
        className="inline-flex items-center justify-center bg-amber-400 text-white font-semibold px-5 py-2 rounded-2xl shadow-md hover:bg-amber-500 hover:shadow-lg transition-all duration-300"
      >
        + Add Employee
      </Link>
    </div>


      <EmployeeCard/>
    </AdminLayout>
   );

 }