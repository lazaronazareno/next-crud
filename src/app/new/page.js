'use client'
import { useTasks } from "@/context/TaskContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

function Page({ params }) {
  const {tasks, addTask, updateTask } = useTasks()
  const router = useRouter()

  const {register, handleSubmit, formState : {errors}, setValue} = useForm()

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateTask(params.id, data)
      toast.success('Task updated Successfully')
    } else {
      addTask(data.title, data.description)
      toast.success('Task created Successfully')
    }
    router.push('/')
  })

  useEffect(() => {
    if (params.id) {
      const taskFound = tasks.find((task) => task.id === params.id)
      if (taskFound) {
        setValue('title', taskFound.title)
        setValue('description', taskFound.description)
      }
    }
  }, []);

  return (
    <div className="flex flex-col gap-1 min-h-full m-1">
      <h2 className="text-center font-bold">{params.id ? 'Update Task' : 'New Task' }</h2>
      <form className="flex flex-col gap-1 h-96 text-black" onSubmit={onSubmit}>
        <div className="h-5/6 bg-slate-50 p-1 rounded-xl">
          <input
            className="text-black bg-slate-50 placeholder:text-zinc-500 py-3 px-1 block focus:outline-none w-full"
            placeholder="write a title..."
            {...register('title', { required: true })}
            autoFocus
          />
          {errors.title && (
            <span className="block text-red-400 mb-2">this field is required</span>
          )}
          <textarea
            className="h-3/4 bg-slate-50 px-1 block resize-none placeholder:text-zinc-500 focus:outline-none w-full"
            placeholder="write a description..."
            {...register('description', {required: true})}
          />
          {errors.description && (
            <span className="block text-red-400 mb-2">this field is required</span>
          )}
        </div>
        <div className="flex w-full gap-1 text-black">
          <button
            className="w-1/3 bg-gray-200 hover:bg-gray-400 px-2 py-3 rounded-xl"
            type="button"
            onClick={() => router.push('/')}
          >Cancel</button>
          <button
            className="w-2/3 bg-yellow-500 hover:bg-yellow-400 px-2 py-3 rounded-xl disabled:opacity-30"
            disabled={errors.title && errors.description}
            type="submit"
          >Save</button>
        </div>
      </form>
    </div>
  );
}

export default Page;