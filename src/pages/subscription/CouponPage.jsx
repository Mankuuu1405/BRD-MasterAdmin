import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import couponService from "../../services/couponService";
import subscriptionService from "../../services/subscriptionService";
import {
  FiArrowLeft,
  FiSearch,
  FiPlus,
  FiMoreVertical,
  FiSave,
} from "react-icons/fi";
import { BiX } from "react-icons/bi";

export default function CouponPage() {
  const [list, setList] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const [subscriptions, setSubscriptions] = useState([]);

  const [panelMode, setPanelMode] = useState(null);
  const [form, setForm] = useState({});
  const [selectedUUID, setSelectedUUID] = useState(null);

  // ---------------------------
  // LOAD ALL COUPONS
  // ---------------------------
  const loadCoupons = async () => {
    const res = await couponService.getAll();
    setList(res.data);
    setFiltered(res.data);
  };

  const loadSubscriptions = async () => {
    const res = await subscriptionService.getAll();
    setSubscriptions(res.data);
  };

  useEffect(() => {
    loadCoupons();
    loadSubscriptions();
  }, []);

  // ---------------------------
  // SEARCH HANDLER
  // ---------------------------
  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearch(keyword);
    setFiltered(
      list.filter((item) =>
        item.coupon_code.toLowerCase().includes(keyword)
      )
    );
  };

  // ---------------------------
  // PANEL OPENERS
  // ---------------------------
  const emptyForm = {
    coupon_code: "",
    coupon_value: "",
    date_from: "",
    date_to: "",
    subscription_id: [],
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

  // ---------------------------
  // FORM CHANGE HANDLER
  // ---------------------------
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // checkbox logic
  const toggleSubscription = (id) => {
    const updatedList = form.subscription_id.includes(id)
      ? form.subscription_id.filter((x) => x !== id)
      : [...form.subscription_id, id];

    setForm({ ...form, subscription_id: updatedList });
  };

  // ---------------------------
  // SUBMIT HANDLER
  // ---------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (panelMode === "add") {
      await couponService.create(form);
    } else if (panelMode === "edit") {
      await couponService.update(selectedUUID, form);
    }

    closePanel();
    loadCoupons();
  };

  const handleDelete = async (uuid) => {
    await couponService.delete(uuid);
    loadCoupons();
  };

  return (
    <MainLayout>
      {/* PAGE HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <button className="p-2 rounded-xl bg-white  hover:bg-gray-100">
          <FiArrowLeft />
        </button>
        <h1 className="text-xl font-semibold">Coupons</h1>
      </div>

      {/* SEARCH + ADD */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center bg-white p-3 rounded-xl w-[85%] shadow-sm ">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search coupon..."
            className="outline-none w-full"
            value={search}
            onChange={handleSearch}
          />
        </div>

        <button
          onClick={openAdd}
          className="px-4 py-3 bg-blue-600 text-white rounded-xl flex items-center gap-2 hover:bg-blue-700 shadow"
        >
          <FiPlus /> Add Coupon
        </button>
      </div>

      {/* COUPON LIST */}
      <div className="bg-white rounded-xl shadow-sm  p-6 mb-10">
        {filtered.length === 0 ? (
          <p className="text-gray-500 text-sm">No coupons found.</p>
        ) : (
          filtered.map((item) => (
            <div
              key={item.uuid}
              className="flex justify-between items-center py-4  last:border-none"
            >
              <div>
                <p className="text-lg font-medium">{item.coupon_code}</p>
                <p className="text-sm text-gray-500">
                  Value: ₹{item.coupon_value} | Valid: {item.date_from} →{" "}
                  {item.date_to}
                </p>
              </div>

              <div className="relative group">
                <button className="p-2 hover:bg-gray-100 rounded-xl">
                  <FiMoreVertical />
                </button>

                <div className="hidden group-hover:block absolute right-0 top-8 bg-white border rounded-xl shadow-lg w-36 z-30">
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
          {/* Panel Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold capitalize">
              {panelMode} Coupon
            </h2>
            <button onClick={closePanel}>
              <BiX className="text-3xl text-gray-600" />
            </button>
          </div>

          {/* VIEW MODE */}
          {panelMode === "view" ? (
            <div className="space-y-3 text-gray-700">
              <p><b>Code:</b> {form.coupon_code}</p>
              <p><b>Value:</b> ₹{form.coupon_value}</p>
              <p><b>Date From:</b> {form.date_from}</p>
              <p><b>Date To:</b> {form.date_to}</p>

              <p><b>Subscriptions Applicable:</b></p>
              <ul className="list-disc pl-6">
                {form.subscription_id?.map((id) => (
                  <li key={id}>{id}</li>
                ))}
              </ul>
            </div>
          ) : (
            /* ADD / EDIT FORM */
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                label="Coupon Code *"
                name="coupon_code"
                value={form.coupon_code}
                onChange={handleChange}
                required
              />

              <Input
                label="Coupon Value (₹) *"
                name="coupon_value"
                type="number"
                value={form.coupon_value}
                onChange={handleChange}
                required
              />

              <Input
                label="Valid From *"
                name="date_from"
                type="date"
                value={form.date_from}
                onChange={handleChange}
                required
              />

              <Input
                label="Valid To *"
                name="date_to"
                type="date"
                value={form.date_to}
                onChange={handleChange}
                required
              />

              {/* Subscription checkboxes */}
              <div>
                <label className="text-sm text-gray-700 font-medium">
                  Select Applicable Subscriptions
                </label>

                <div className="mt-2 space-y-2">
                  {subscriptions.map((sub) => (
                    <label
                      key={sub.uuid}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={form.subscription_id.includes(sub.uuid)}
                        onChange={() => toggleSubscription(sub.uuid)}
                      />
                      {sub.subscription_name}
                    </label>
                  ))}
                </div>
              </div>

              {/* Save */}
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

/* ---------------- HELPERS ---------------- */
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
