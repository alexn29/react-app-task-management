export type ViewToggle = 'grid' | 'list'

export type TaskStatus = 'BACKLOG' | 'CANCELLED' | 'DONE' | 'IN_PROGRESS' | 'TODO'

export type PointEstimate = 'ZERO' | 'ONE' | 'TWO' | 'FOUR' | 'EIGHT'

export type DueDateStatus = 'ON_TIME' | 'ALMOST_LATE' | 'LATE'

export interface DueDateInfo {
  formattedDate: string
  date: string
  status: DueDateStatus
}

export interface Task {
  assignee: {
    avatar: string
    createdAt: Date
    email: string
    fullName: string
    id: string
    type: string
    updatedAt: Date
  }
  createdAt: Date
  dueDate: string
  id: string
  name: string
  pointEstimate: PointEstimate
  position: number
  status: TaskStatus
  tags: string[]
}
