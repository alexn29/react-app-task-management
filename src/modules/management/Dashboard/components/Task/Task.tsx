import classNames from 'classnames'
import { IconButton } from '@modules/common/components/IconButton'
import { text2Number, formattedDueDate } from '@modules/common/utils'
import type { Task as TaskType } from '@app-types/tasks'
import styles from './task.module.scss'

interface Props {
  taskInfo: TaskType
}
const Task = ({ taskInfo }: Props) => {
  const { formattedDate, date, status } = formattedDueDate(taskInfo.dueDate)

  return (
    <div className={styles.taskContainer}>
      <div className={classNames(styles.row, styles.titleContainer)}>
        <h3>{taskInfo.name}</h3>
        <IconButton icon="ri-more-fill" onClick={() => {}} />
      </div>

      <div className={classNames(styles.row, styles.dueDateContainer)}>
        <p>{text2Number(taskInfo.pointEstimate)} points</p>
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
