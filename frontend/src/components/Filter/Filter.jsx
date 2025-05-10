import { useState } from "react";
import "./Filter.scss";
import { Link, useSearchParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";

export const Filter = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    guests: searchParams.get("guests") || null,
    startDate: searchParams.get("startDate") || new Date(),
    endDate: searchParams.get("endDate") || addDays(new Date(), 1),
    property: searchParams.get("property") || "",
    minPrice: null,
    maxPrice: null,
  });

  const handleDateChange = (dates) => {
    const [start, end] = dates;

    setQuery((prev) => ({
      ...prev,
      startDate: start,
      endDate: end,
    }));
  };

  return (
    <div className="filter">
      <div className="top">
        {/* <div className="item">
          <label htmlFor="city">Location</label>
          <input
            type="text"
            name="city"
            id="city"
            value={query.city}
            placeholder="City Location"
          />
        </div> */}
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="city">Location</label>
          <input
            type="text"
            name="city"
            id="city"
            value={query.city}
            placeholder="City Location"
            onChange={(e) =>
              setQuery((prev) => ({ ...prev, city: e.target.value }))
            }
          />
        </div>
        <div className="item">
          <label htmlFor="type">Type</label>
          <select name="type" id="type" value={query.type}>
            <option value="">any</option>
            <option value="stay">Stay</option>
            <option value="rent">Rent</option>
          </select>
        </div>

        <div className="item">
          <label htmlFor="guests">Guests</label>
          <input
            type="number"
            name="guests"
            id="guests"
            value={query.guests}
            placeholder="any"
            onChange={(e) =>
              setQuery((prev) => ({ ...prev, guests: e.target.value }))
            }
          />
        </div>

        <div className="item date-picker">
          <label>Checkin Date</label>
          <DatePicker
            selectsRange
            startDate={query.startDate}
            endDate={query.endDate}
            minDate={new Date()}
            onChange={handleDateChange}
          />
        </div>
        {/* <div className="item">
          <label htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            name="minPrice"
            id="minPrice"
            value={query.minPrice}
            placeholder="any"
          />
        </div>
        <div className="item">
          <label htmlFor="maxPrice">Max Price</label>
          <input
            type="number"
            name="maxPrice"
            id="maxPrice"
            value={query.maxPrice}
            placeholder="any"
          />
        </div> 
        <div className="item">
          <label htmlFor="property">Property</label>
          <select name="property" id="property" value={query.property}>
            <option value="">any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
          </select>
        </div>*/}

        <Link
          to={{
            pathname: `/list`,
            search: `?${new URLSearchParams(query).toString()}`,
          }}
        >
          <button>
            <img src="/search.png" alt="" />
          </button>
        </Link>
      </div>
    </div>
  );
};
