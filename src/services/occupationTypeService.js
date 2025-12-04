import { api } from "./api";

const ENDPOINT = "/masters/occupation-type/";

const occupationTypeService = {

  getAll: () => api.get(ENDPOINT),

  getById: (uuid) => api.get(`${ENDPOINT}${uuid}/`),

  create: (data) =>
    api.post(ENDPOINT, {
      occ_name: data.occ_name,
      created_user: data.created_user || "admin",
      modified_user: data.modified_user || "admin",
    }),

  update: (uuid, data) =>
    api.put(`${ENDPOINT}${uuid}/`, {
      occ_name: data.occ_name,
      modified_user: data.modified_user || "admin",
    }),

  delete: (uuid) => api.delete(`${ENDPOINT}${uuid}/`),
};

export default occupationTypeService;
