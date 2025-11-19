// src/pages/tenants/AddOrganization.jsx
import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiSave, FiUploadCloud } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { organizationService } from "../../services/organizationService";

export default function AddOrganization() {
  const navigate = useNavigate();

  // ---------------- FORM STATE ----------------
  const [form, setForm] = useState({
    name: "",
    address: "",
    contact_person: "",
    phone: "",
    email: "",
    gst_number: "",
    pan_number: "",
    business_type: "",
    registration_no: "",
    loan_prefix: "",
    is_active: true,
  });

  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  // ---------------- FORM HANDLERS ----------------
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  // ---------------- SUBMIT HANDLER ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors(null);

    try {
      const payload = { ...form, logo: logo ? logo.name : null };

      await organizationService.addOrganization(payload);

      navigate("/organization");
    } catch (err) {
      setErrors("Something went wrong while saving.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition shadow-sm"
        >
          <FiArrowLeft className="text-gray-700 text-xl" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Add New Organization
          </h1>
          <p className="text-gray-500 text-sm">
            Enter company details to register a new organization.
          </p>
        </div>
      </div>

      {/* FORM CARD */}
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-4xl">

        {/* Error Box */}
        {errors && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-200">
            {errors}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Organization Name */}
            <InputField
              label="Organization Name *"
              name="name"
              placeholder="ABC Finance Pvt Ltd"
              value={form.name}
              onChange={handleChange}
              required
            />

            {/* Business Type */}
            <SelectField
              label="Business Type *"
              name="business_type"
              value={form.business_type}
              onChange={handleChange}
              required
              options={[
                "NBFC",
                "Micro Finance",
                "Cooperative Society",
                "Private Lender",
              ]}
            />

            {/* Contact Person */}
            <InputField
              label="Contact Person *"
              name="contact_person"
              value={form.contact_person}
              onChange={handleChange}
              placeholder="Rahul Sharma"
              required
            />

            {/* Email */}
            <InputField
              label="Email Address *"
              name="email"
              type="email"
              placeholder="support@abcfinance.com"
              value={form.email}
              onChange={handleChange}
              required
            />

            {/* Phone */}
            <InputField
              label="Phone Number *"
              name="phone"
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={handleChange}
              required
            />

            {/* Registration No */}
            <InputField
              label="Registration No / CIN"
              name="registration_no"
              placeholder="U12345MH2019PTC123456"
              value={form.registration_no}
              onChange={handleChange}
            />

            {/* GST No */}
            <InputField
              label="GST Number"
              name="gst_number"
              placeholder="22AAAAA0000A1Z5"
              maxLength={15}
              value={form.gst_number}
              onChange={handleChange}
            />

            {/* PAN No */}
            <InputField
              label="PAN Number"
              name="pan_number"
              placeholder="ABCDE1234F"
              maxLength={10}
              value={form.pan_number}
              onChange={handleChange}
            />

            {/* Loan Prefix */}
            <InputField
              label="Loan ID Prefix *"
              name="loan_prefix"
              placeholder="ABC"
              value={form.loan_prefix}
              onChange={handleChange}
              required
            />

          </div>

          {/* ADDRESS */}
          <div>
            <label className="text-gray-700 text-sm font-medium">Full Address *</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              placeholder="Head Office Address"
              className="w-full mt-2 p-3 rounded-xl bg-gray-50 shadow-sm focus:bg-white outline-none"
            />
          </div>

          {/* LOGO UPLOAD */}
          <div>
            <label className="text-gray-700 text-sm font-medium">Company Logo</label>
            <div className="mt-2 flex items-center gap-4">
              <label className="p-3 rounded-xl bg-gray-50 border border-dashed cursor-pointer hover:bg-gray-100 flex items-center gap-2">
                <FiUploadCloud className="text-gray-600" />
                <span>Upload Logo</span>
                <input type="file" hidden accept="image/*" onChange={handleLogoChange} />
              </label>

              {logoPreview && (
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className="h-16 w-16 rounded-lg shadow object-cover"
                />
              )}
            </div>
          </div>

          {/* ACTIVE STATUS */}
          <div className="flex items-center gap-3">
            <label className="text-gray-700 text-sm font-medium">Is Active?</label>
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
              className="w-5 h-5"
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
          >
            <FiSave />
            {loading ? "Saving..." : "Save Organization"}
          </button>
        </form>
      </div>
    </MainLayout>
  );
}

/* ---------------- REUSABLE INPUT COMPONENT ---------------- */
function InputField({ label, ...props }) {
  return (
    <div>
      <label className="text-gray-700 text-sm font-medium">{label}</label>
      <input
        {...props}
        className="w-full mt-2 p-3 rounded-xl bg-gray-50 shadow-sm focus:bg-white outline-none"
      />
    </div>
  );
}

/* ---------------- REUSABLE SELECT COMPONENT ---------------- */
function SelectField({ label, options = [], ...props }) {
  return (
    <div>
      <label className="text-gray-700 text-sm font-medium">{label}</label>
      <select
        {...props}
        className="w-full mt-2 p-3 rounded-xl bg-gray-50 shadow-sm outline-none"
      >
        <option value="">Select option</option>
        {options.map((op, i) => (
          <option key={i} value={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  );
}
