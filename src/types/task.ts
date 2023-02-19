export type ViewToggle = 'grid' | 'list'

export type TaskStatus = 'BACKLOG' | 'CANCELLED' | 'DONE' | 'IN_PROGRESS' | 'TODO'

export type PointEstimate = 'ZERO' | 'ONE' | 'TWO' | 'FOUR' | 'EIGHT'

export type DueDateStatus = 'ON_TIME' | 'ALMOST_LATE' | 'LATE'

export interface DueDateInfo {
  formattedDate: string
  date: string
  status: DueDateStatus
}

export interface Assignee {
  avatar: string
  createdAt: Date
  email: string
  fullName: string
  id: string
  type: string
  updatedAt: Date
}

export interface Task {
  assignee: Assignee
  createdAt: Date
  dueDate: string
  id?: string
  name: string
  pointEstimate: PointEstimate | null
  position?: number
  status?: TaskStatus | null
  tags: string[]
}
