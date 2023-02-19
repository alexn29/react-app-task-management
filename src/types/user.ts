export type UserType = 'ADMIN' | 'CANDIDATE'

export interface User {
  avatar: string
  createdAt: string
  email: string
  fullName: string
  id: string
  type: UserType
  updatedAt: string
}
