import { Range } from "react-date-range";
import "./ListingReservation.scss";

import { Calendar } from "../Calendar/Calendar";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

interface ListingReservationProps {
  price: number;
  dateRange?: Range;
  //   totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  //   disabled?: boolean;
  disabledDates?: Date[];
}

export const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  //   totalPrice,
  onChangeDate,
  onSubmit,
  //   disabled,
  disabledDates,
}) => {
  const [guests, setGuests] = useState(0);
  const pricePerNight = useMemo(() => {
    return (guests || 1) * price;
  }, [guests, price]);

  return (
    <div className="reservation-container">
      {!disabledDates ? (
        <p>Error loading availability calendar...</p>
      ) : (
        <>
          <Calendar
            value={dateRange}
            disabledDates={disabledDates}
            onChange={onChangeDate}
          />
          <form action="" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                type="number"
                name="guest"
                id="guest"
                value={guests || 1}
                onChange={(e) => setGuests(Number(e.target.value))}
              />
              <label>Guests</label>
            </div>

            <div className="price">
              $<span>{pricePerNight}</span> / night
            </div>

            <div className="btn-book">
              <button type="submit">Reserve</button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};
