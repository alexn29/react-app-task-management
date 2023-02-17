import { gql } from '@apollo/client'

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
