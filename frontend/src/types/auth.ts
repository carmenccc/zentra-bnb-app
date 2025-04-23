import { ApiResponse } from "@shared/index";
import { UserData } from "@shared/types/models";

export type CurrentUser = UserData | null;

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  username: string;
  password: string;
}

export type AuthResponse = ApiResponse<null>;
export type CurrentUserResponse = ApiResponse<CurrentUser>;
