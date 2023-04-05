import { useTasks } from "@/context/TaskContext"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"

export function TaskCard({ task }) {
  const router = useRouter()
  const { deleteTask } = useTasks()

  const handleDelete = (e) => {
    e.stopPropagation()
    const accept = window.confirm("Are you sure?")
    if (accept) {
      deleteTask(task.id)
      toast.success('Task deleted Successfully')
    }
  }
  
  return (
    <div className="flex flex-col justify-between bg-slate-50 text-black text-start hover:bg-yellow-300 w-72 p-2 m-2 rounded-2xl"
    >
      <div>
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <p className="text-neutral-400">{task.description}</p>
      </div>
      <div className="flex justify-between">
        <button
          className="bg-red-700 hover:bg-red-600 w-8 rounded-lg items-center cursor-pointer"
          onClick={(e) => handleDelete(e)}
        >🗑️
        </button>
        <button
          className="bg-blue-700 hover:bg-blue-600 w-8 rounded-lg items-center cursor-pointer"
          onClick={() => router.push(`/edit/${task.id}`)}
        >✏️
        </button>
      </div>
    </div>
  )
}