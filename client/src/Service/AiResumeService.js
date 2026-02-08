import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Enhance professional summary
export const enhanceProfessionalSummary = (userContent) =>
  API.post("/api/ai/enhance-pro-summary", { userContent });

// Enhance job description
export const enhanceJobDescription = (userContent) =>
  API.post("/api/ai/enhance-job-description", { userContent });

// Upload resume for AI parsing
export const uploadResumeAI = (resumeText, title) =>
  API.post("/api/ai/upload-resume", { resumeText, title });
