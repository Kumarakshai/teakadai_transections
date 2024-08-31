import { Axios } from "@/lib/axios";

export const getAllTransaction = async () => {
  const response = await Axios.get("/transactions");

  return response;
};

export const createTransaction = async (payload: any) => {
  try {
    const response = await Axios.post("/transactions", payload);
    // console.log(response.data);
    return response;
  } catch (error) {
    console.log("error:", error);
  }
};
