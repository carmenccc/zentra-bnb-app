export type UserData = {
  id: number;
  email: string;
  username: string;
  avatar: string | null;
  createdAt: Date;
};

export type Listing = {
  id: string;
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

  createdAt: Date;
  userId: number;
  listingDetail?: ListingDetail;
  user?: { username: string; avatar: string | null };
  isSaved: boolean;
  disabledDates?: Date[];
};

export enum ListingType {
  STAY = "stay",
  RENT = "rent",
}

export enum PropertyType {
  HOUSE = "house",
  APARTMENT = "apartment",
  CABIN = "cabin",
  VILLA = "villa",
  OTHER = "other",
}

export type ListingDetail = {
  id: string;
  description: string;
  utilities?: string;
  pet?: string;
  size?: number;

  amenities?: Amenity[];
  features?: string[];
  roomTypes?: RoomType[];
  listingId?: string;
};

export type Amenity = {
  id: number;
  name: string;
  icon: string;
};

export type RoomType = {
  id: number;
  name: string;
  icon: string;
};

export type Reservation = {
  id: string;
  userId: number;
  listingId: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  createdAt: Date;

  user?: UserData;
  listing?: Listing;
};
