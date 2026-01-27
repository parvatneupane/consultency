
import AdminLayout from "../AdminLayout";
import AddCustomerForm from "../../components/admincomponents/AddCustomerForm";

export default function AddCustomer() {
    return (
        <AdminLayout>
        <div>
            <h2 className="text-2xl font-bold">Add Customer Page</h2>
             <AddCustomerForm />
        </div>
       
        </AdminLayout>
    );
}