import Swal from 'sweetalert2'
import type { SweetAlertResult } from 'sweetalert2'
import { useMutation } from '@apollo/client'
import classNames from 'classnames'
import { Dropdown } from 'semantic-ui-react'
import { GET_TASKS } from '@graphql/queries'
import { DELETE_TASK } from '@graphql/mutations'
import { useTaskStore } from '@modules/common/store/useTaskStore'
import { text2Number, formattedDueDate } from '@modules/common/utils'
import type { Task as TaskType } from '@app-types/task'
import styles from './task.module.scss'

interface Props {
  taskInfo: TaskType
}
const Task = ({ taskInfo }: Props) => {
  const setTask = useTaskStore((s) => s.setTask)
  const { formattedDate, date, status } = formattedDueDate(taskInfo.dueDate)
  const [deleteTask] = useMutation(DELETE_TASK)

  const handleEdit = () => {
    setTask(taskInfo)
  }

  const handleDelete = () => {
    void Swal.fire({
      html: `Are you sure to delete the task &laquo;${taskInfo.name}&raquo;?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--primary_4)',
      confirmButtonText: 'Yes, delete it!',
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        deleteTask({
          variables: {
            input: { id: taskInfo.id },
          },
          refetchQueries: [
            {
              query: GET_TASKS,
              variables: {
                input: {
                  status: taskInfo.status,
                },
              },
            },
          ],
        })
          .then(() => {
            void Swal.fire({
              icon: 'success',
              html: `Task &laquo;${taskInfo.name}&raquo; deleted successfully`,
              showConfirmButton: false,
            })
          })
          .catch((error) => {
            const errorMessage = `There was an error deleting the task &laquo;${taskInfo.name}&raquo; `
            void Swal.fire({
              icon: 'error',
              html: errorMessage,
              showConfirmButton: false,
            })
            console.error(errorMessage, error)
          })
      }
    })
  }

  return (
    <div className={styles.taskContainer}>
      <div className={classNames(styles.row, styles.titleContainer)}>
        <h3>{taskInfo.name}</h3>
        <Dropdown icon="ellipsis horizontal" className="icon">
          <Dropdown.Menu direction="left">
            <Dropdown.Item onClick={handleEdit}>Edit</Dropdown.Item>
            <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className={classNames(styles.row, styles.dueDateContainer)}>
        <p>{`${text2Number(taskInfo.pointEstimate ?? 'ZERO')} points`}</p>
        <div
          className={classNames(styles.dueDate, {
            [styles.onTime]: status === 'ON_TIME',
            [styles.almostLate]: status === 'ALMOST_LATE',
            [styles.late]: status === 'LATE',
          })}
        >
          <i className="ri-timer-line"></i>
          <span title={date}>{formattedDate}</span>
        </div>
      </div>

      <div className={classNames(styles.row, styles.tagsContainer)}>
        {taskInfo.tags.map((tag, index) => (
          <div key={`${tag}-${index}`} className={classNames(styles.tag, styles.secondary)}>
            {tag}
          </div>
        ))}
      </div>

      <img
        width={36}
        height={36}
        className={styles.avatar}
        src={taskInfo.assignee.avatar}
        alt={taskInfo.assignee.fullName}
        title={taskInfo.assignee.fullName}
      />
    </div>
  )
}

export default Task
