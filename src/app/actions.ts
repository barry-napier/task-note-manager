"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function addTask(formData: FormData) {
  const supabase = createServerActionClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return { error: "Not authenticated" };
  }

  const title = formData.get("title") as string;

  const { error } = await supabase.from("tasks").insert({
    title,
    user_id: session.user.id,
  });

  if (error) {
    console.error("Error adding task:", error);
    return { error: "Failed to add task" };
  }

  revalidatePath("/");
  return { success: true };
}
