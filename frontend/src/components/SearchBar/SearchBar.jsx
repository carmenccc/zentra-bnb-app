import { useState } from "react";
import "./SearchBar.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";
import { Link } from "react-router-dom";

const types = ["stay", "rent"];

export const SearchBar = () => {
  const [query, setQuery] = useState({
    type: "stay",
    city: "London",
    checkInDate: new Date(),
    checkOutDate: addDays(new Date(), 3),
    guests: "",
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleCityChange = (val) => {
    setQuery((prev) => ({ ...prev, city: val }));
  };
  const handleGuestsChange = (val) => {
    setQuery((prev) => ({ ...prev, guests: val }));
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;

    setQuery((prev) => ({
      ...prev,
      checkInDate: start,
      checkOutDate: end,
    }));
  };

  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={query.type == type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>
      <form action="">
        <div className="form-group">
          <label>Destination</label>
          <input
            type="text"
            name="city"
            placeholder="City location"
            onChange={handleCityChange}
          />
        </div>
        <div className="form-group date-picker">
          <label>Checkin Date</label>
          <DatePicker
            selectsRange
            startDate={query.checkInDate}
            endDate={query.checkOutDate}
            minDate={new Date()}
            onChange={handleDateChange}
          />
        </div>
        <div className="form-group">
          <label>Guest</label>
          <input
            type="number"
            name="guest"
            id="guest"
            placeholder="Number of travellers"
            onChange={handleGuestsChange}
          />
        </div>
        <div className="btnSearch">
          <Link
            to={`/list?type=${query.type}&city=${query.city}&guests=${query.guests}`}
          >
            <button>
              <img src="/search.png" alt="" />
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};
