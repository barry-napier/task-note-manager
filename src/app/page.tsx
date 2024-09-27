import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addTask } from "./actions";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/signin");
  }

  const { data: tasks } = await supabase.from("tasks").select("*");

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">Task Note Manager</h1>
        <SignOutButton />
      </div>
      <form action={addTask} className="flex gap-2 mb-4">
        <Input name="title" placeholder="New task" />
        <Button type="submit">Add Task</Button>
      </form>
      <ul>
        {tasks?.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

function SignOutButton() {
  const handleSignOut = async () => {
    "use server";
    const supabase = createServerActionClient({ cookies });
    await supabase.auth.signOut();
    redirect("/signin");
  };

  return (
    <form action={handleSignOut}>
      <Button type="submit">Sign Out</Button>
    </form>
  );
}
