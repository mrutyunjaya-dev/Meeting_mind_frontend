import axios from "axios";

export const API_BASE = (import.meta as any).env.VITE_API_BASE || "http://localhost:4000";

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json"
  }
});

export const MeetingsAPI = {
  async list() {
    const { data } = await api.get("/meetings");
    return data;
  },
  async get(id: string) {
    const { data } = await api.get(`/meetings/${id}`);
    return data;
  },
  async upload(file: File) {
    const form = new FormData();
    form.append("file", file);
    const { data } = await api.post("/transcribe", form, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return data;
  }
};

export const InsightsAPI = {
  async overview() {
    const { data } = await api.get("/api/insights");
    return data;
  }
};
