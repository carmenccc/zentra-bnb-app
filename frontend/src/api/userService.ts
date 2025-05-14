import { Listing } from "@zentra/shared";
import axios, { AxiosError } from "axios";

const API_BASE = `/api/user`;

type ListingsResponse = Listing[];

export const fetchUserListings = async (): Promise<ListingsResponse> => {
  // const res = await axios.get(`${API_BASE}/listings`);
  const res = await axios.get(`${API_BASE}/listings`, {
    withCredentials: true,
  });

  console.log(res.data);
  return res.data.data;
};
export const fetchSavedListings = async (): Promise<ListingsResponse> => {
  // const res = await axios.get(`${API_BASE}/saved`);
  const res = await axios.get(`${API_BASE}/listings`, {
    withCredentials: true,
  });

  console.log(res.data);
  return res.data.data;
};
