"use server";

import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";

export async function updateGuest(formData: FormData) {
  // console.log(formData);
  const session = await auth();

  console.log(session);

  if (!session) throw new Error("You are not logged in");

  const nationalID = formData.get("nationalID") as string;
  const [nationality, countryFlag] = (formData.get("nationality") ?? "").toString().split("%");

 if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

    const updateData = { nationality, countryFlag, nationalID };

    // console.log(updateData);

  const { data, error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', session.user?.id || "")
    .select()
    .single();

  if (error) throw new Error('Guest could not be updated');
  
  return data;
}


export async function signInAction() {
  await signIn("google", {redirectTo: "/account"});
}

export async function signOutAction() {
  await signOut({redirectTo: "/"});
}