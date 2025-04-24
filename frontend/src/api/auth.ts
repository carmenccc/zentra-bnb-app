import axios, { AxiosError } from "axios";
import {
  AuthResponse,
  CurrentUserResponse,
  LoginInput,
  RegisterInput,
} from "../types/auth";

const API_BASE = `${import.meta.env.VITE_BACKEND_API}/auth`;

export const login = async (data: LoginInput): Promise<AuthResponse> => {
  try {
    const res = await axios.post<AuthResponse>(`${API_BASE}/login`, data, {
      withCredentials: true, // 🔥 this enables cookies to be accepted
    });
    return res.data;
  } catch (err) {
    const axiosError = err as AxiosError;
    return (
      (axiosError.response?.data as AuthResponse) || {
        success: false,
        errors: [{ message: "Unkown server error." }],
      }
    );
  }
};

export const register = async (data: RegisterInput): Promise<AuthResponse> => {
  try {
    const res = await axios.post<AuthResponse>(`${API_BASE}/register`, data, {
      withCredentials: true, // 🔥 this enables cookies to be accepted
    });
    return res.data;
  } catch (err) {
    const axiosError = err as AxiosError;
    return (
      (axiosError.response?.data as AuthResponse) || {
        success: false,
        errors: [{ message: "Unkown server error." }],
      }
    );
  }
};

export const getCurrentUser = async (): Promise<CurrentUserResponse> => {
  try {
    const res = await axios.get<CurrentUserResponse>(
      `${API_BASE}/currentuser`,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return { success: false, message: "Unkown error", data: null };
    // return { success: false, message: "Unkown error" };
  }
};

export const logout = async (): Promise<void> => {
  await axios.post(`${API_BASE}/logout`, {
    withCredentials: true, // 🔥 this enables cookies to be accepted
  });
};
