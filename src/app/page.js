'use client'
import { TaskCard } from "@/components/TaskCard";
import { useTasks } from "@/context/TaskContext";

function Page() {
  const { tasks } = useTasks()
  return (
    <div className="flex justify-center">
      <div className="w-full flex flex-wrap">
        {tasks.map(task => (
          <TaskCard task={task} key={task.id} />
        ))}
      </div>
    </div>
  );
}

export default Page;