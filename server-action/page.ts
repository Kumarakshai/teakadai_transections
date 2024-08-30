import axios from "axios";

export const getAllTransaction = () => {
  const url = "https://api.teakadai.app/api/transactions";
  const options = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtMDR5MXZncDAwMDQ2cmNodjV2OXlmeTciLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MjQ2NTI0NTYsImV4cCI6MTcyNTA4NDQ1Nn0.5wgKueysdIruAm3QBSdLnpdb6ZlDC6lQhkzkDLCRnrw",
    },
  };
  const response = axios.get(url, options);

  return response;
};

export const getAllProducts = () => {
  const url = "https://api.teakadai.app/api/products";
  const options = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtMDR5MXZncDAwMDQ2cmNodjV2OXlmeTciLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MjQ2NTI0NTYsImV4cCI6MTcyNTA4NDQ1Nn0.5wgKueysdIruAm3QBSdLnpdb6ZlDC6lQhkzkDLCRnrw",
    },
  };
  const response = axios.get(url, options);

  return response;
};
