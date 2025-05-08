import { ListingType, PropertyType } from "./models";

export interface ApiError {
  message: string;
  field?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: ApiError[];
}

export interface GetListingsQuery {
  city?: string;
  type?: ListingType;
  property?: PropertyType;
  //   bedroom?: string;
  minPrice?: string;
  maxPrice?: string;
}
