import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

const BugAPI = {
  getBugs: () => API.get("/bugs"),
  createBug: (data) => API.post("/bugs", data),
  updateBug: (id, data) => API.put(`/bugs/${id}`, data),
  deleteBug: (id) => API.delete(`/bugs/${id}`),
};

export default BugAPI;
