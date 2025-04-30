import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "./Calendar.scss";
import "react-date-range/dist/styles.css"; // main style
import "react-date-range/dist/theme/default.css"; // theme style

interface CalendarProps {
  value: Range;
  onChange: (value: Range) => void;
  disabledDates?: Date[];
}

export const Calendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  disabledDates,
}) => {
  const handleChange = (ranges: RangeKeyDict) => {
    onChange(ranges.selection);
  };

  return (
    <div className="calendar-container">
      <DateRange
        rangeColors={["#262626"]}
        ranges={[value]}
        date={new Date()}
        onChange={handleChange}
        direction="vertical"
        showDateDisplay={false}
        minDate={new Date()}
        disabledDates={disabledDates}
      />
    </div>
  );
};
