import AdminLayout from "../AdminLayout";
import CustomerCard from "../../components/admincomponents/CustomerCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api";

export default function Customer() {
  const token = localStorage.getItem("auth_token");
  const [customers, setCustomers] = useState([]); 

  const fetchCustomers = async () => {
    try {
      const response = await api.get("api/customers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCustomers(response.data.data); 
      console.log("Customers:", response.data.data); 
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <AdminLayout>
      {/* Add Customer Button */}
      <div className="flex justify-end mb-4">
        <Link
          to="/addcustomer"
          className="inline-flex items-center justify-center bg-amber-400 text-white font-semibold px-5 py-2 rounded-2xl shadow-md hover:bg-amber-500 hover:shadow-lg transition-all duration-300"
        >
          + Add Customer
        </Link>
      </div>

      {/* Customer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customers.length > 0 ? (
          customers.map((customer) => (
            <CustomerCard key={customer.id} customer={customer} />
          ))
        ) : (
          <p>No customers found.</p>
        )}
      </div>
    </AdminLayout>
  );
}
