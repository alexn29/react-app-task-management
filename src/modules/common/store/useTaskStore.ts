import create from 'zustand'
import { devtools } from 'zustand/middleware'
import type { Task } from '@app-types/task'

interface TaskStore {
  task: Task | null
  setTask: (task: Task | null) => void
}
export const useTaskStore = create<TaskStore>()(
  devtools(
    (set) => ({
      task: null,
      setTask: (task: Task | null) => {
        set(() => ({ task }))
      },
    }),
    { name: 'task-store' }
  )
)
