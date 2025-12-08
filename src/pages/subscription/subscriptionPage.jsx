import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import subscriptionService from "../../services/subscriptionService";
import { FiArrowLeft, FiSearch, FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function SubscriptionPage() {
  const [list, setList] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // Load data
  const loadData = async () => {
    try {
      const data = await subscriptionService.getAll(); // <-- FIXED
      setList(data);                                   // <-- FIXED
      setFiltered(data);                               // <-- FIXED
    } catch (err) {
      console.error("Error loading subscriptions:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Search filter
  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearch(keyword);
    setFiltered(
      list.filter((item) =>
        item.subscription_name?.toLowerCase().includes(keyword)
      )
    );
  };

  // Delete
  const handleDelete = async (uuid) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    await subscriptionService.delete(uuid);
    loadData();
  };

  return (
    <MainLayout>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-white border hover:bg-gray-100"
        >
          <FiArrowLeft />
        </button>
        <h1 className="text-xl font-semibold">Subscriptions</h1>
      </div>

      {/* Search + Add Button */}
      <div className="flex justify-center items-center mb-6 gap-3">
        <div className="flex items-center bg-white p-2 rounded-xl w-[90%] shadow-sm border">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search subscription..."
            className="outline-none w-full"
            value={search}
            onChange={handleSearch}
          />
        </div>

        <button
          onClick={() => navigate("/subscriptions/add")}
          className="px-10 py-3 bg-blue-600 text-white rounded-xl flex items-center gap-2 hover:bg-blue-700 shadow"
        >
          <FiPlus /> Add
        </button>
      </div>

      {/* Subscription List */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        {filtered?.length === 0 ? (
          <p className="text-gray-500 text-sm">No subscriptions found.</p>
        ) : (
          filtered.map((item) => (
            <div
              key={item.uuid}
              className="flex justify-between items-center py-4 border-b last:border-none"
            >
              <div>
                <p className="text-lg font-medium">{item.subscription_name}</p>
                <p className="text-sm text-gray-500">
                  ₹{item.subscription_amount} • {item.no_of_borrowers} borrowers •{" "}
                  {item.type_of}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate(`/subscriptions/edit/${item.uuid}`)}
                  className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 text-yellow-700"
                >
                  <FiEdit2 size={18} />
                </button>

                <button
                  onClick={() => handleDelete(item.uuid)}
                  className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </MainLayout>
  );
}
