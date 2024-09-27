import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addTask } from "./actions";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data: tasks } = await supabase.from("tasks").select("*");

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Task Note Manager</h1>
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
