import {
  ApiResponse,
  CreateReservationParams,
  Reservation,
} from "@zentra/shared";
import axios from "axios";

const API_BASE = `/api/reservation`;

export const createReservation = async (params: CreateReservationParams) => {
  console.log(params);
  const res = await axios.post<ApiResponse<Reservation>>(
    `${API_BASE}/`,
    params
  );
  console.log(res);

  return res.data.data!;
};
