import { ApiError } from "@shared/index";

export class ApiResponseObj<T> {
  constructor(
    public success: boolean,
    public message?: string,
    public data?: T | null,
    public errors?: ApiError[]
  ) {}
}
