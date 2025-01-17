"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";

// update guest
export async function updateGuest(formData: FormData) {
  const session = await auth();

  if (!session) throw new Error("You are not logged in");

  const nationalID = formData.get("nationalID") as string;
  const [nationality, countryFlag] = (formData.get("nationality") ?? "").toString().split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

    const updateData = { nationality, countryFlag, nationalID };

  const {error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', session.user?.id || "")
    .select()
    .single();

  if (error) throw new Error('Guest could not be updated');
  
  revalidatePath("/account/profile");

}

// delete reservation 
export async function deleteReservation(bookingId: number) {
  const session = await auth();
  if (!session) throw new Error("You are not logged in");

    const guestBookings = await getBookings(session.user?.id || 0);
    const guestBokingIds = guestBookings.map((booking) => booking.id);

    if (!guestBokingIds.includes(bookingId))
      throw new Error("You are not allowed to delete this reservation");

    const { error } = await supabase.from('bookings').delete().eq('id', bookingId);

  if (error) {
    throw new Error('Booking could not be deleted');
  }

  // update UI
  revalidatePath("/account/reservations");

}

export async function signInAction() {
  await signIn("google", {redirectTo: "/account"});
}

export async function signOutAction() {
  await signOut({redirectTo: "/"});
}