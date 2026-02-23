import AdminLayout from "../AdminLayout";
import AddEmployeeForm from "../../components/admincomponents/employee/AddEmployeeForm";

export default function AddEmployee() {
    return (
        <AdminLayout>
        <div>
            <h2 className="text-2xl font-bold">Add Employee Page</h2>
             <AddEmployeeForm />
        </div>
       
        </AdminLayout>
    );
}