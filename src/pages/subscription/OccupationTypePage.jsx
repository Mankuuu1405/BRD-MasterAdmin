import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import occupationTypeService from "../../services/occupationTypeService";
import {
  FiArrowLeft,
  FiSearch,
  FiPlus,
  FiMoreVertical,
  FiSave,
} from "react-icons/fi";
import { BiX } from "react-icons/bi";

export default function OccupationTypePage() {
  const [list, setList] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const [panelMode, setPanelMode] = useState(null); // add | edit | view
  const [form, setForm] = useState({});
  const [selectedUUID, setSelectedUUID] = useState(null);

  const emptyForm = {
    occ_name: "",
    created_user: "admin",
    modified_user: "admin",
  };

  // Load all occupation types
  const loadOccupationTypes = async () => {
    const res = await occupationTypeService.getAll();
    setList(res.data);
    setFiltered(res.data);
  };

  useEffect(() => {
    loadOccupationTypes();
  }, []);

  // Search handler
  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearch(keyword);

    setFiltered(
      list.filter((item) =>
        item.occ_name.toLowerCase().includes(keyword)
      )
    );
  };

  // PANEL openers
  const openAdd = () => {
    setForm(emptyForm);
    setPanelMode("add");
  };

  const openEdit = (item) => {
    setSelectedUUID(item.uuid);
    setForm(item);
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

  // Form handler
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (panelMode === "add") {
      await occupationTypeService.create(form);
    } else if (panelMode === "edit") {
      await occupationTypeService.update(selectedUUID, form);
    }

    closePanel();
    loadOccupationTypes();
  };

  const handleDelete = async (uuid) => {
    await occupationTypeService.delete(uuid);
    loadOccupationTypes();
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <button className="p-2 rounded-xl bg-white  hover:bg-gray-100">
          <FiArrowLeft />
        </button>
        <h1 className="text-xl font-semibold">Occupation Types</h1>
      </div>

      {/* SEARCH + ADD */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center bg-white p-3 rounded-xl w-[85%]  shadow-sm">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search Occupation Type..."
            className="outline-none w-full"
            value={search}
            onChange={handleSearch}
          />
        </div>

        <button
          onClick={openAdd}
          className="px-4 py-3 bg-blue-600 text-white rounded-xl flex items-center gap-2 hover:bg-blue-700 shadow"
        >
          <FiPlus /> Add Type
        </button>
      </div>

      {/* LIST */}
      <div className="bg-white rounded-xl  shadow-sm p-6 mb-10">
        {filtered.length === 0 ? (
          <p className="text-gray-500 text-sm">No occupation types found.</p>
        ) : (
          filtered.map((item) => (
            <div
              key={item.uuid}
              className="flex justify-between items-center py-4  last:border-none"
            >
              <p className="text-lg font-medium">{item.occ_name}</p>

              <div className="relative group">
                <button className="p-2 hover:bg-gray-100 rounded-xl">
                  <FiMoreVertical />
                </button>

                <div className="hidden group-hover:block absolute right-0 top-8 w-36 bg-white  shadow-xl rounded-xl z-20">
                  <button
                    onClick={() => openView(item)}
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                  >
                    View
                  </button>

                  <button
                    onClick={() => openEdit(item)}
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item.uuid)}
                    className="block px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
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
        <div className="fixed top-0 right-0 h-full w-[400px] bg-white border-l shadow-xl p-6 z-50 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold capitalize">
              {panelMode} Occupation Type
            </h2>
            <button onClick={closePanel}>
              <BiX className="text-3xl text-gray-600" />
            </button>
          </div>

          {/* VIEW MODE */}
          {panelMode === "view" ? (
            <div className="space-y-3 text-gray-700">
              <p><b>Name:</b> {form.occ_name}</p>
              <p><b>Created At:</b> {form.created_at}</p>
              <p><b>Modified At:</b> {form.modified_at}</p>
            </div>
          ) : (
            /* ADD/EDIT FORM */
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm text-gray-700 font-medium">
                  Occupation Name *
                </label>
                <input
                  type="text"
                  name="occ_name"
                  value={form.occ_name}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full p-3 bg-gray-50 border rounded-xl outline-none"
                />
              </div>

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
