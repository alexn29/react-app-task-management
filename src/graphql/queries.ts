import { gql } from '@apollo/client'
import type { PointEstimate, TaskStatus } from '@app-types/task'

export const GET_TASKS = gql`
  query Tasks($input: FilterTaskInput!) {
    tasks(input: $input) {
      assignee {
        avatar
        createdAt
        email
        fullName
        id
        type
        updatedAt
      }
      createdAt
      dueDate
      id
      name
      pointEstimate
      position
      status
      tags
    }
  }
`
export const GET_USERS = gql`
  query Users {
    users {
      avatar
      createdAt
      email
      fullName
      id
      type
      updatedAt
    }
  }
`
export const GET_USER_PROFILE = gql`
  query Profile {
    profile {
      avatar
      createdAt
      email
      fullName
      id
      type
      updatedAt
    }
  }
`

export const GET_POINT_ESTIMATE = () => {
  const pointEstimate: PointEstimate[] = ['ZERO', 'ONE', 'TWO', 'FOUR', 'EIGHT']
  return pointEstimate
}

export const GET_TAGS = () => {
  const tags: string[] = ['ANDROID', 'IOS', 'NODE_JS', 'RAILS', 'REACT']
  return tags
}

export const GET_STATUS = () => {
  const status: TaskStatus[] = ['BACKLOG', 'CANCELLED', 'DONE', 'IN_PROGRESS', 'TODO']
  return status
}
