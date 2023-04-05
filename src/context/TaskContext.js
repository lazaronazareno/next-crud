"use client"
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { createContext, useContext } from "react";

export const TaskContext = createContext()

export const useTasks = () => {
  const context = useContext(TaskContext)

  if (!context) throw new Error('useTasks must used within a provider')
  return context
}

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage('tasks', [])

  const addTask = (title, description) => {
    setTasks([...tasks, {
      title, description, id: window.crypto.randomUUID()
    }])
  }

  const deleteTask = (id) => {
    setTasks([...tasks.filter((task) => task.id !== id)])
  }

  const updateTask = (id, newValues) => {
    setTasks([...tasks.map(task =>
      task.id === id
        ? { ...task, ...newValues }
        : task
        )])
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        updateTask
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}