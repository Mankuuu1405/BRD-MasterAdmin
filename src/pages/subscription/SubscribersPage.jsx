import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import subscribersService from "../../services/subscribersService";
import subscriptionService from "../../services/subscriptionService";
import {
  FiArrowLeft,
  FiSearch,
  FiPlus,
  FiMoreVertical,
  FiSave,
} from "react-icons/fi";
import { BiX } from "react-icons/bi";

export default function SubscribersPage() {
  const [list, setList] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const [panelMode, setPanelMode] = useState(null);
  const [form, setForm] = useState({});
  const [selectedUUID, setSelectedUUID] = useState(null);

  const [subscriptions, setSubscriptions] = useState([]);

  // Load all data
  const loadSubscribers = async () => {
    const res = await subscribersService.getAll();
    setList(res.data);
    setFiltered(res.data);
  };

  const loadSubscriptions = async () => {
    const res = await subscriptionService.getAll();
    setSubscriptions(res.data);
  };

  useEffect(() => {
    loadSubscribers();
    loadSubscriptions();
  }, []);

  // Search handler
  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearch(keyword);
    setFiltered(
      list.filter((item) =>
        item.tenant_id.toLowerCase().includes(keyword)
      )
    );
  };

  // OPENERS
  const emptyForm = {
    subscription_id: "",
    tenant_id: "",
    created_user: "admin",
    modified_user: "admin",
  };

  const openAdd = () => {
    setForm(emptyForm);
    setPanelMode("add");
  };

  const openEdit = (item) => {
    setForm(item);
    setSelectedUUID(item.uuid);
    setPanelMode("edit");
  };

  const openView = (item) => {
    setForm(item);
    setPanelMode("view");
  };

  const closePanel = () => {
    setPanelMode(null);
    setSelectedUUID(null);
  };

  // Handle change
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (panelMode === "add") {
      await subscribersService.create(form);
    } else if (panelMode === "edit") {
      await subscribersService.update(selectedUUID, form);
    }

    closePanel();
    loadSubscribers();
  };

  const handleDelete = async (uuid) => {
    await subscribersService.delete(uuid);
    loadSubscribers();
  };

  return (
    <MainLayout>
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-6">
        <button className="p-2 rounded-xl bg-white border hover:bg-gray-100">
          <FiArrowLeft />
        </button>
        <h1 className="text-xl font-semibold">Subscribers</h1>
      </div>

      {/* Search + Add */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center bg-white p-3 rounded-xl w-[85%] shadow-sm ">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by tenant ID..."
            className="outline-none w-full"
            value={search}
            onChange={handleSearch}
          />
        </div>

        <button
          onClick={openAdd}
          className="px-4 py-3 bg-blue-600 text-white rounded-xl flex items-center gap-2 hover:bg-blue-700 shadow"
        >
          <FiPlus /> Add Subscriber
        </button>
      </div>

      {/* LIST */}
      <div className="bg-white rounded-xl shadow-sm  p-6 mb-10">
        {filtered.length === 0 ? (
          <p className="text-gray-500 text-sm">No subscribers found.</p>
        ) : (
          filtered.map((item) => (
            <div
              key={item.uuid}
              className="flex justify-between items-center py-4 border-b last:border-none"
            >
              <div>
                <p className="text-lg font-medium">
                  Tenant ID: {item.tenant_id}
                </p>
                <p className="text-sm text-gray-500">
                  Subscription: {item.subscription_id}
                </p>
              </div>

              <div className="relative group">
                <button className="p-2 hover:bg-gray-100 rounded-xl">
                  <FiMoreVertical />
                </button>

                <div className="hidden group-hover:block absolute right-0 top-8 bg-white border shadow-xl rounded-xl w-36 z-30">
                  <button
                    onClick={() => openView(item)}
                    className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                  >
                    View
                  </button>
                  <button
                    onClick={() => openEdit(item)}
                    className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.uuid)}
                    className="block w-full px-4 py-2 text-red-600 hover:bg-red-50 text-left"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* SLIDE PANEL */}
      {panelMode && (
        <div className="fixed right-0 top-0 h-full w-[400px] bg-white border-l shadow-xl p-6 z-50 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold capitalize">
              {panelMode} Subscriber
            </h2>
            <button onClick={closePanel}>
              <BiX className="text-3xl text-gray-600" />
            </button>
          </div>

          {/* VIEW MODE */}
          {panelMode === "view" ? (
            <div className="space-y-3 text-gray-700">
              <p><b>Tenant ID:</b> {form.tenant_id}</p>
              <p><b>Subscription ID:</b> {form.subscription_id}</p>
              <p><b>Created At:</b> {form.created_at}</p>
              <p><b>Modified At:</b> {form.modified_at}</p>
            </div>
          ) : (
            /* ADD/EDIT FORM */
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Subscription */}
              <div>
                <label className="text-sm text-gray-700 font-medium">
                  Subscription *
                </label>
                <select
                  name="subscription_id"
                  value={form.subscription_id}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full p-3 bg-gray-50 border rounded-xl"
                >
                  <option value="">Select Subscription</option>
                  {subscriptions.map((sub) => (
                    <option key={sub.uuid} value={sub.uuid}>
                      {sub.subscription_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tenant ID */}
              <Input
                label="Tenant ID *"
                name="tenant_id"
                value={form.tenant_id}
                onChange={handleChange}
                required
              />

              <button className="w-full bg-blue-600 text-white py-3 rounded-xl flex justify-center items-center gap-2 hover:bg-blue-700">
                <FiSave /> Save
              </button>
            </form>
          )}
        </div>
      )}
    </MainLayout>
  );
}

/* ---- Helper ---- */
function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-gray-700 text-sm">{label}</label>
      <input
        {...props}
        className="mt-1 w-full p-3 bg-gray-50 border rounded-xl outline-none"
      />
    </div>
  );
}
