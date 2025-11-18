import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

const BugAPI = {
  getBugs: () => API.get("/bugs"),
  createBug: (data) => API.post("/bugs", data),
  updateBug: (id, data) => API.put(`/bugs/${id}`, data),
  deleteBug: (id) => API.delete(`/bugs/${id}`),
};

export default BugAPI;
