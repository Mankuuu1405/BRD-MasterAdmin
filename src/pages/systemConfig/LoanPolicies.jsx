// src/pages/systemConfig/LoanPolicies.jsx
import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import loanPolicyService from "../../services/loanPolicyService";
import {
  FiArrowLeft,
  FiSave,
  FiAlertTriangle,
  FiInfo,
  FiSettings,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";


const LoanPolicies = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [formOpen, setFormOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    loan_type: "",
    min_amount: "",
    max_amount: "",
    interest_rate: "",
    processing_fee: "",
  });

  // LOAD DATA FROM BACKEND
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await loanProductService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error loading Loan Products:", error);
    }
    setLoading(false);
  };

  // HANDLE FORM INPUTS
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // OPEN CREATE FORM
  const openCreate = () => {
    setEditId(null);
    setFormData({
      name: "",
      loan_type: "",
      min_amount: "",
      max_amount: "",
      interest_rate: "",
      processing_fee: "",
    });
    setFormOpen(true);
  };

  // OPEN EDIT FORM
  const openEdit = (item) => {
    setEditId(item.id);
    setFormData({
      name: item.name,
      loan_type: item.loan_type,
      min_amount: item.min_amount,
      max_amount: item.max_amount,
      interest_rate: item.interest_rate,
      processing_fee: item.processing_fee,
    });
    setFormOpen(true);
  };

  // SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await loanProductService.updateProduct(editId, formData);
        alert("Loan Product updated successfully!");
      } else {
        await loanProductService.createProduct(formData);
        alert("Loan Product created successfully!");
      }

      setFormOpen(false);
      loadProducts();

    } catch (error) {
      console.error("Save Error:", error);
      alert("Error saving product");
    }
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await loanProductService.deleteProduct(id);
      alert("Product deleted");
      loadProducts();
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Unable to delete!");
    }
  };

  return (
    <MainLayout title="Loan Product Policies">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">Loan Product Policies</h2>

        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <FiPlus /> Add Product
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-lg shadow p-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-gray-100 text-left">
                <th className="p-2">Name</th>
                <th className="p-2">Loan Type</th>
                <th className="p-2">Min Amount</th>
                <th className="p-2">Max Amount</th>
                <th className="p-2">Interest %</th>
                <th className="p-2">Processing Fee</th>
                <th className="p-2 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.loan_type}</td>
                  <td className="p-2">₹{item.min_amount}</td>
                  <td className="p-2">₹{item.max_amount}</td>
                  <td className="p-2">{item.interest_rate}%</td>
                  <td className="p-2">₹{item.processing_fee}</td>

                  <td className="p-2 flex gap-3 justify-center">
                    <button
                      onClick={() => openEdit(item)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FiEdit size={18} />
                    </button>

                    <button
                      onClick={() => deleteProduct(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* FORM POPUP */}
      {formOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white shadow-lg rounded-xl p-6 w-[500px]">

            <h3 className="text-xl font-semibold mb-4">
              {editId ? "Edit Loan Product" : "Add Loan Product"}
            </h3>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

              <input
                type="text"
                name="name"
                placeholder="Product Name"
                className="border p-2 rounded"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <select
                name="loan_type"
                className="border p-2 rounded"
                value={formData.loan_type}
                onChange={handleChange}
                required
              >
                <option value="">Select Loan Type</option>
                <option value="personal">Personal</option>
                <option value="car">Car</option>
                <option value="home">Home</option>
                <option value="business">Business</option>
              </select>

              <input
                type="number"
                name="min_amount"
                placeholder="Minimum Amount"
                className="border p-2 rounded"
                value={formData.min_amount}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="max_amount"
                placeholder="Maximum Amount"
                className="border p-2 rounded"
                value={formData.max_amount}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="interest_rate"
                placeholder="Interest Rate (%)"
                className="border p-2 rounded"
                value={formData.interest_rate}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="processing_fee"
                placeholder="Processing Fee"
                className="border p-2 rounded"
                value={formData.processing_fee}
                onChange={handleChange}
                required
              />

              <div className="col-span-2 flex justify-end mt-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {editId ? "Update" : "Create"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </MainLayout>
  );
};

export default LoanPolicies;
