import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import subscriptionService from "../../services/subscriptionService";
import {
  FiArrowLeft,
  FiSearch,
  FiPlus,
  FiMoreVertical,
  FiSave,
} from "react-icons/fi";
import { BiX } from "react-icons/bi";

export default function SubscriptionPage() {
  const [list, setList] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  // PanelState = add | edit | view | null
  const [panelMode, setPanelMode] = useState(null);
  const [selected, setSelected] = useState(null);

  const loadData = async () => {
    const res = await subscriptionService.getAll();
    setList(res.data);
    setFiltered(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearch(keyword);
    setFiltered(
      list.filter((item) =>
        item.subscription_name.toLowerCase().includes(keyword)
      )
    );
  };

  // ---------------------------
  // FORM STATES
  // ---------------------------
  const emptyForm = {
    subscription_name: "",
    subscription_amount: "",
    no_of_borrowers: "",
    type_of: "",
    created_user: "admin",
    modified_user: "admin",
  };

  const [form, setForm] = useState(emptyForm);

  const openAdd = () => {
    setForm(emptyForm);
    setPanelMode("add");
  };

  const openEdit = (item) => {
    setForm(item);
    setSelected(item.uuid);
    setPanelMode("edit");
  };

  const openView = (item) => {
    setForm(item);
    setPanelMode("view");
  };

  const closePanel = () => {
    setPanelMode(null);
    setSelected(null);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ---------------------------
  // SUBMIT HANDLERS
  // ---------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (panelMode === "add") {
      await subscriptionService.create(form);
    } else if (panelMode === "edit") {
      await subscriptionService.update(selected, form);
    }

    closePanel();
    loadData();
  };

  const handleDelete = async (uuid) => {
    await subscriptionService.delete(uuid);
    loadData();
  };

  return (
    <MainLayout>
      {/* PAGE HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <button className="p-2 rounded-xl bg-white border hover:bg-gray-100">
          <FiArrowLeft />
        </button>
        <h1 className="text-xl font-semibold">Subscriptions</h1>
      </div>

      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center bg-white p-2 rounded-xl w-[85%] shadow-sm border">
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
          onClick={openAdd}
          className="px-4 py-3 bg-blue-600 text-white rounded-xl flex items-center gap-2 hover:bg-blue-700 shadow"
        >
          <FiPlus /> Add Subscription
        </button>
      </div>

      {/* LIST SECTION */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-10">
        {filtered.length === 0 ? (
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

              {/* 3 DOT MENU */}
              <div className="relative group">
                <button className="p-2 hover:bg-gray-100 rounded-xl">
                  <FiMoreVertical className="text-gray-700" />
                </button>

                <div className="hidden group-hover:block absolute right-0 top-8 bg-white shadow-lg border rounded-xl z-20 w-36">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => openView(item)}
                  >
                    View
                  </button>

                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => openEdit(item)}
                  >
                    Edit
                  </button>

                  <button
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                    onClick={() => handleDelete(item.uuid)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* SLIDE PANEL (Add / Edit / View) */}
      {panelMode && (
        <div className="fixed right-0 top-0 h-full w-[400px] bg-white border-l shadow-xl p-6 z-50 overflow-y-auto">
          {/* PANEL HEADER */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold capitalize">
              {panelMode} Subscription
            </h2>
            <button onClick={closePanel}>
              <BiX className="text-3xl text-gray-600" />
            </button>
          </div>

          {/* VIEW MODE */}
          {panelMode === "view" ? (
            <div className="space-y-3 text-gray-700">
              <p><b>Name:</b> {form.subscription_name}</p>
              <p><b>Amount:</b> ₹{form.subscription_amount}</p>
              <p><b>Borrowers:</b> {form.no_of_borrowers}</p>
              <p><b>Type:</b> {form.type_of}</p>
              <p><b>Created At:</b> {form.created_at}</p>
              <p><b>Modified At:</b> {form.modified_at}</p>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                label="Subscription Name *"
                name="subscription_name"
                value={form.subscription_name}
                onChange={handleChange}
                required
              />

              <Input
                label="Amount *"
                name="subscription_amount"
                type="number"
                value={form.subscription_amount}
                onChange={handleChange}
                required
              />

              <Input
                label="No. of Borrowers *"
                name="no_of_borrowers"
                type="number"
                value={form.no_of_borrowers}
                onChange={handleChange}
                required
              />

              <Select
                label="Type *"
                name="type_of"
                value={form.type_of}
                onChange={handleChange}
                options={["Monthly", "Quarterly", "Yearly"]}
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

function Select({ label, options, ...props }) {
  return (
    <div>
      <label className="text-gray-700 text-sm">{label}</label>
      <select
        {...props}
        className="mt-1 w-full p-3 bg-gray-50 border rounded-xl outline-none"
      >
        <option value="">Select Type</option>
        {options.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  );
}
