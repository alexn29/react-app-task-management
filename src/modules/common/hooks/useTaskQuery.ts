import { useQuery } from '@apollo/client'
import type { Task, TaskStatus } from '@app-types/task'
import { GET_TASKS } from '@graphql/queries'

interface Props {
  status: TaskStatus
}
export const useTaskQuery = ({ status }: Props) => {
  const { loading, data, error } = useQuery<{ tasks: Task[] }>(GET_TASKS, {
    variables: { input: { status } },
  })

  return { loading, data, error }
}
