import { Axios } from "@/lib/axios";

export const userDetails = async () => {
  const response = await Axios.get("/users");

  return response;
};
