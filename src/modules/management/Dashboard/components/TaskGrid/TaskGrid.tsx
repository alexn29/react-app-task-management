import { Task } from './components/Task'
import { useTaskQuery } from '@modules/common/hooks/useTaskQuery'
import { GridSkeleton } from '@modules/common/components/GridSkeleton'
import { EmptyPlaceholder } from '@modules/common/components/EmptyPlaceholder'
import { ErrorPlaceholder } from '@modules/common/components/ErrorPlaceholder'
import styles from './task-grid.module.scss'

const TaskGrid = () => {
  const {
    loading: loadingBacklogTasks,
    data: backlogTasks,
    error: errorBacklogTasks,
  } = useTaskQuery({ status: 'BACKLOG' })

  const {
    loading: loadingInProgressTasks,
    data: inProgressTasks,
    error: errorInProgressTasks,
  } = useTaskQuery({ status: 'IN_PROGRESS' })

  const {
    loading: loadingCompletedTasks,
    data: completedTasks,
    error: errorCompleted,
  } = useTaskQuery({ status: 'DONE' })

  if (loadingBacklogTasks || loadingInProgressTasks || loadingCompletedTasks) {
    return (
      <div className={styles.loadingContainer}>
        <GridSkeleton />
        <GridSkeleton />
        <GridSkeleton />
      </div>
    )
  }

  if (
    errorBacklogTasks !== undefined ||
    errorInProgressTasks !== undefined ||
    errorCompleted !== undefined
  ) {
    return (
      <ErrorPlaceholder
        icon="ri-emotion-sad-line"
        title="Oops! something went wrong!"
        description="There was an error getting the data. Please try again!"
      />
    )
  }

  return (
    <div className={styles.tasksGrid}>
      <div className={styles.taskColumn}>
        <p className={styles.title}>Backlog ({backlogTasks?.tasks.length ?? 0})</p>
        <div className={styles.tasks}>
          {backlogTasks?.tasks !== undefined && backlogTasks?.tasks.length > 0 ? (
            backlogTasks?.tasks.map((task) => <Task key={task.id} taskInfo={task} />)
          ) : (
            <EmptyPlaceholder />
          )}
        </div>
      </div>
      <div className={styles.taskColumn}>
        <p className={styles.title}>In Progress ({inProgressTasks?.tasks.length ?? 0})</p>
        <div className={styles.tasks}>
          {inProgressTasks?.tasks !== undefined && inProgressTasks?.tasks.length > 0 ? (
            inProgressTasks?.tasks.map((task) => <Task key={task.id} taskInfo={task} />)
          ) : (
            <EmptyPlaceholder />
          )}
        </div>
      </div>
      <div className={styles.taskColumn}>
        <p className={styles.title}>Completed ({completedTasks?.tasks.length ?? 0})</p>
        <div className={styles.tasks}>
          {completedTasks?.tasks !== undefined && completedTasks?.tasks.length > 0 ? (
            completedTasks?.tasks.map((task) => <Task key={task.id} taskInfo={task} />)
          ) : (
            <EmptyPlaceholder />
          )}
        </div>
      </div>
    </div>
  )
}

export default TaskGrid
