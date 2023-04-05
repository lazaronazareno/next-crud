'use client'
import { useTasks } from "@/context/TaskContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Navbar() {
  const router = useRouter()
  const { tasks } = useTasks()
  
  return (
    <header className="flex justify-between items-center p-2 border-b border-yellow-300">
      <div>
        <Link href="/">
          <h1 className="font-bold text-3xl text-white">
            Your Notes
          </h1>
        </Link>
        <span className="text-slate-300 text-sm ml-1">{ tasks.length} tasks</span>
      </div>
      
      <nav>
        <button
          className="hover:bg-yellow-300 border rounded-lg p-3 text-gray-50 font-bold inline-flex items-center"
          onClick={() => router.push('/new')}>➕</button>
      </nav>
    </header>
  );
}
