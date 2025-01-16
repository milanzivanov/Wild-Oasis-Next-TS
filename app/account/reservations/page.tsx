import ReservationCard from "@/app/_components/ReservationCard";
import { auth } from "@/app/_lib/auth";
import { getBookings } from "@/app/_lib/data-service";
import { Booking } from "@/app/types";
import Link from "next/link";

export const metadata = {
  title: "Reservations"
};

export default async function Page() {
  const session = await auth();
  const bookings: Booking[] = await getBookings(session?.user?.id || 0);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ul className="space-y-6">
          {bookings.map((booking) => (
            <ReservationCard booking={booking} key={booking.guestId} />
          ))}
        </ul>
      )}
    </div>
  );
}
