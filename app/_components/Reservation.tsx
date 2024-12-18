import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

import { Cabin as CabinType, SettingsProps } from "@/app/types";

async function Reservation({ cabin }: { cabin: CabinType }) {
  const [rawSettings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id)
  ]);

  const settings: SettingsProps = {
    id: rawSettings.id,
    created_at: rawSettings.created_at,
    minBookingLength: rawSettings.minBookingLength ?? 1, // Default value if null
    maxBookingLength: rawSettings.maxBookingLength ?? 30, // Default value if null
    breakfastPrice: rawSettings.breakfastPrice ?? 0 // Default value if null
  };

  return (
    <div className="grid grid-cols-1 border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      <ReservationForm cabin={cabin} />
    </div>
  );
}
export default Reservation;
