"use client";

// import { isWithinInterval } from "date-fns";
import { SettingsProps, Cabin } from "@/app/types";
import { DateRange, DayPicker } from "react-day-picker";

import "react-day-picker/style.css";
import { useReservation } from "./ReservationContext";

// function isAlreadyBooked(range: { from: Date; to: Date }, datesArr: Date[]) {
//   return (
//     range.from &&
//     range.to &&
//     datesArr.some((date) =>
//       isWithinInterval(date, { start: range.from, end: range.to })
//     )
//   );
// }

function DateSelector({
  settings,
  bookedDates,
  cabin
}: {
  settings: SettingsProps;
  bookedDates: Date[];
  cabin: Cabin;
}) {
  const { range, setRange, resetRange } = useReservation();

  // CHANGE
  const regularPrice = 23;
  const discount = 23;
  const numNights = 23;
  const cabinPrice = 23;

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="py-12 place-self-center"
        mode="range"
        onSelect={(selected: DateRange | undefined) => {
          if (selected) {
            setRange({ from: selected.from, to: selected.to });
          } else {
            setRange({ from: undefined, to: undefined });
          }
        }}
        selected={range}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
          {/* for testing purpuses not part of the project */}
          <div>
            <h4>{cabin.name}</h4>
            {bookedDates.length > 0 && (
              <p>Warning: Some dates are already booked.</p>
            )}
          </div>
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
