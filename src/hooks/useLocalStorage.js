import { useEffect, useState } from "react"

export function useLocalStorage(key, initialState) {
  const [state, setstate] = useState(initialState);

  useEffect(() => {
    const item = localStorage.getItem(key)
    const tasks = JSON.parse(item)
    if (tasks) {
      setstate(tasks)
    }
  }, []);

  useEffect(() => {
    if (state.length > 0) {
      localStorage.setItem(key, JSON.stringify(state))
    }
  }, [state]);

  return [state, setstate]
}