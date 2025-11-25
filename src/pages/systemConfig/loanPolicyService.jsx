import React, { useEffect, useState } from "react";
import axios from "axios";

export default function LoanPolicyService() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://127.0.0.1:8000/api/adminpanel/loan-products/";

  useEffect(() => {
    fetchLoanPolicies();
  }, []);

  const fetchLoanPolicies = async () => {
    try {
      const token = localStorage.getItem("access"); // stored during login

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPolicies(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching loan policies:", error);
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Loan Policy Service</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Loan Type</th>
              <th className="border p-2">Interest Rate</th>
              <th className="border p-2">Processing Fee</th>
            </tr>
          </thead>

          <tbody>
            {policies.map((policy) => (
              <tr key={policy.id}>
                <td className="border p-2">{policy.id}</td>
                <td className="border p-2">{policy.name}</td>
                <td className="border p-2">{policy.loan_type}</td>
                <td className="border p-2">{policy.interest_rate}%</td>
                <td className="border p-2">{policy.processing_fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
