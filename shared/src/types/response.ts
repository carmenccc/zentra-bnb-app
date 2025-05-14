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
  guests?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface CreateListingParams {
  listing: {
    title: string;
    price: number;
    images: string[];
    address: string;
    city: string;
    latitude: string;
    longitude: string;
    type: ListingType;
    property: PropertyType;
    guestsMin: number;
    guestsMax: number;
    bedroom: number;
    bathroom: number;
  };
  listingDetail: {
    description: string;
    utilities?: string;
    pet?: string;
    size?: number;

    amenities?: { id: number }[];
    features?: string[];
    roomTypes?: { id: number }[];
  };
}

export interface CreateReservationParams {
  listingId: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
}
