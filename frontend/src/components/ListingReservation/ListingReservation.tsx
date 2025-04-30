import { Range } from "react-date-range";
import "./ListingReservation.scss";

import { Calendar } from "../Calendar/Calendar";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  //   totalPrice: number;
  onChangeDate: () => void;
  //   onSubmit: () => void;
  //   disabled?: boolean;
  disabledDates: Date[];
  guests: number;
}

export const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  //   totalPrice,
  onChangeDate,
  //   onSubmit,
  //   disabled,
  disabledDates,
  guests,
}) => {
  const pricePerNight = useMemo(() => {
    return (guests || 1) * price;
  }, [guests, price]);

  return (
    <div className="reservation-container">
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        // onChange={(value) => onChangeDate(value.selection)}
        onChange={onChangeDate}
      />
      <form action="">
        <div className="form-group">
          <input
            type="number"
            name="guest"
            id="guest"
            value={guests || 1}
            // onChange={handleGuestsChange}
          />
          <label>Guests</label>
        </div>

        <div className="price">
          $<span>{pricePerNight}</span> / night
        </div>

        <div className="btn-book">
          <Link to="">
            <button>Reserve</button>
          </Link>
        </div>
      </form>
    </div>
  );
};
