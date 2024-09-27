"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function addTask(formData: FormData) {
  const supabase = createServerActionClient({ cookies });
  const title = formData.get("title") as string;

  const { error } = await supabase.from("tasks").insert({ title });

  if (error) {
    console.error("Error adding task:", error);
    return { error: "Failed to add task" };
  }

  revalidatePath("/");
  return { success: true };
}
