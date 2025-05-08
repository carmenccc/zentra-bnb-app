import { Amenity, RoomType } from "@zentra/shared";
import "./ListingOverview.scss";

import React, { useMemo } from "react";

interface ListingOverviewProps {
  description: string;
  amenities?: Amenity[];
  features?: string[];
  roomTypes?: RoomType[];
}

type AmenityType = { id: number; name: string; icon: string };

export const ListingOverview: React.FC<ListingOverviewProps> = ({
  description,
  amenities,
  features,
  roomTypes,
}) => {
  // dummy data
  const AMENITIES: AmenityType[] = [
    { id: 1, name: "wifi", icon: "/icons/wifi.svg" },
    { id: 2, name: "gym", icon: "/icons/gym.svg" },
    { id: 3, name: "pool", icon: "/icons/pool.svg" },
    { id: 4, name: "lounge", icon: "/icons/lounge.svg" },
    { id: 5, name: "spa", icon: "/icons/spa.svg" },
    { id: 6, name: "breakfast", icon: "/icons/breakfast.svg" },
    { id: 7, name: "hangers", icon: "/icons/hangers.svg" },
  ];
  // State derived variables
  const amenitiesMap = useMemo(() => {
    return AMENITIES.reduce<Record<number, AmenityType>>((acc, a) => {
      acc[a.id] = a;
      return acc;
    }, {});
  }, [AMENITIES]);

  return (
    <div className="overview-container">
      {/* Description */}
      <div className="top">
        <p>{description}</p>
      </div>
      <div className="bottom">
        {/* Amenities */}
        <div className="feature-section">
          <p className="title">Amenities</p>
          <div className="grid-2-col">
            {amenities?.map((amenity) => (
              <div className="tag" key={amenitiesMap[amenity.id].name}>
                <img src={amenitiesMap[amenity.id].icon} alt="" />
                <span>{amenitiesMap[amenity.id].name}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Room Features */}
        <div className="feature-section">
          <p className="title">Features</p>
          <div className="grid-2-col">
            {features?.map((feature) => (
              <div className="tag" key={feature}>
                <img src="/icons/checkmark.svg" alt="" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Room Types */}
        <div className="feature-section">
          <p className="title">Room Type</p>
          <div className="list-vertical">
            {roomTypes?.map((roomType) => (
              <div className="tag" key={roomType.id}>
                <img src="/icons/bed.svg" alt="" />
                <span>{roomType.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
