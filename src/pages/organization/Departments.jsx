import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiPlus, FiEdit, FiTrash2, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDepartments } from "../../hooks/useDepartments";
import { departmentService } from "../../services/departmentService";

const Departments = () => {
  const navigate = useNavigate();

  const { departments, loading, reload } = useDepartments();

  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    id: null,
    name: "",
    staff: 0,
  });

  // ------------------- OPEN MODALS -------------------
  const openAddModal = () => {
    setForm({ id: null, name: "", staff: 0 });
    setEditMode(false);
    setModalOpen(true);
  };

  const openEditModal = (dept) => {
    setForm(dept);
    setEditMode(true);
    setModalOpen(true);
  };

  // ------------------- DELETE -------------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    await departmentService.remove(id);
    reload();
  };

  // ------------------- ADD / UPDATE -------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Department name is required.");
      return;
    }

    if (editMode) {
      await departmentService.update(form.id, form);
    } else {
      await departmentService.add(form);
    }

    setModalOpen(false);
    reload();
  };

  return (
    <MainLayout>
      {/* ---------------- PAGE HEADER ---------------- */}
      <div className="flex items-center justify-between mb-8">

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 shadow-sm transition"
          >
            <FiArrowLeft className="text-gray-700 text-xl" />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">Departments</h1>
            <p className="text-gray-500 text-sm">
              Manage departments for your organization
            </p>
          </div>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-medium shadow"
        >
          <FiPlus className="text-lg" /> Add Department
        </button>
      </div>

      {/* ---------------- TABLE ---------------- */}
      <div className="bg-white p-6 rounded-2xl shadow-md">

        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Department List
        </h2>

        {loading ? (
          <p className="text-gray-500 text-center py-6">Loading...</p>
        ) : departments.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No departments found.</p>
        ) : (
          <div className="space-y-3">

            {departments.map((dept, index) => (
              <div
                key={dept.id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition"
              >
                <div>
                  <h3 className="text-gray-800 font-medium">{dept.name}</h3>
                  <p className="text-gray-500 text-sm">{dept.staff} Staff</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => openEditModal(dept)}
                    className="p-2 bg-yellow-100 rounded-lg hover:bg-yellow-200"
                  >
                    <FiEdit className="text-yellow-700" />
                  </button>

                  <button
                    onClick={() => handleDelete(dept.id)}
                    className="p-2 bg-red-100 rounded-lg hover:bg-red-200"
                  >
                    <FiTrash2 className="text-red-600" />
                  </button>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>

      {/* ---------------- MODAL ---------------- */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-[90%] md:w-[420px] relative">

            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <FiX size={22} />
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {editMode ? "Edit Department" : "Add Department"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-gray-700 text-sm font-medium">
                  Department Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full mt-2 p-3 rounded-xl bg-gray-50 focus:bg-white shadow-sm outline-none"
                  placeholder="Enter department name"
                />
              </div>

              <div>
                <label className="text-gray-700 text-sm font-medium">
                  Staff Count
                </label>
                <input
                  type="number"
                  value={form.staff}
                  onChange={(e) =>
                    setForm({ ...form, staff: Number(e.target.value) })
                  }
                  className="w-full mt-2 p-3 rounded-xl bg-gray-50 focus:bg-white shadow-sm outline-none"
                  placeholder="10"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition shadow"
              >
                {editMode ? "Update Department" : "Add Department"}
              </button>
            </form>

          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default Departments;
