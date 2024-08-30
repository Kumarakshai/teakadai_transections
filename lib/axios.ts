import axios from "axios";

export const Axios = axios.create({
  baseURL: "https://api.teakadai.app/api",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtMDR5MXZncDAwMDQ2cmNodjV2OXlmeTciLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MjQ2NTI0NTYsImV4cCI6MTcyNTA4NDQ1Nn0.5wgKueysdIruAm3QBSdLnpdb6ZlDC6lQhkzkDLCRnrw",
    "Content-Type": "application/json",
  },
});
