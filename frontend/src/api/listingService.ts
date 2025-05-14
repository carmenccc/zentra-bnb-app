import {
  ApiResponse,
  CreateListingParams,
  GetListingsQuery,
  Listing,
} from "@zentra/shared";
import axios, { AxiosError } from "axios";

const API_BASE = `/api/listing`;

type ListingsResponse = Listing[];
type ListingResponse = Listing;

export const fetchListings = async (
  params?: GetListingsQuery
): Promise<ListingsResponse> => {
  console.log(params);
  const res = await axios.get<ApiResponse<ListingsResponse>>(`${API_BASE}/`, {
    params,
  });

  return res.data.data || [];
};

export const fetchSingleListing = async (
  id: string
): Promise<ListingResponse> => {
  const res = await axios.get<ApiResponse<ListingResponse>>(
    `${API_BASE}/${id}`
  );

  // TEMP
  return res.data.data!;
};

export const saveListing = async (listingId: string) => {
  try {
    const res = await axios.post(`${API_BASE}/save`, {
      listingId,
    });

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const unsaveListing = async (listingId: string) => {
  try {
    console.log("deleting save");
    const res = await axios.delete(`${API_BASE}/save/${listingId}`);

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const createListing = async (params: CreateListingParams) => {
  const res = await axios.post(`${API_BASE}/`, params);

  return res.data;
};
