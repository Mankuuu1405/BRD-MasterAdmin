import { api } from "./api";

const BASE_URL = "/api/v1/users/";

export const userService = {
  
  async getUsers() {
    const res = await api.get(BASE_URL);
    return res.data;
  },

  async getUser(id) {
    const res = await api.get(`${BASE_URL}${id}/`);
    return res.data;
  },

  // ✅ ADD NEW USER (FIX)
 async addUser(data) {
  const res = await api.post("/api/v1/users/", data);
  return res.data;
}
,


  async toggleUserStatus(id) {
    return api.patch(`${BASE_URL}${id}/`, {
      isDeleted: false,
      statusToggle: true
    });
  },
 async deleteUser(id) {
    // ✅ REAL DELETE (ModelViewSet destroy)
    return api.delete(`${BASE_URL}${id}/`);
  },
  async updateUser(id, data) {
  const res = await api.patch(`/api/v1/users/${id}/`, data);
  return res.data;
}

};
