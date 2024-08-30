import { Axios } from "@/lib/axios";

export const getAllProducts = async () => {
  const response = await Axios.get("/products");

  return response;
};
