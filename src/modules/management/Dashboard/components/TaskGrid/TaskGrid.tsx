import { Task } from '../Task'
import styles from './task-grid.module.scss'

const TaskGrid = () => {
  return (
    <div className={styles.tasksGrid}>
      <div className={styles.taskColumn}>
        <p className={styles.title}>Working (2)</p>
        <Task />
        <Task />
        <Task />
      </div>
      <div className={styles.taskColumn}>
        <p className={styles.title}>In Progress (3)</p>
        <Task />
        <Task />
        <Task />
      </div>
      <div className={styles.taskColumn}>
        <p className={styles.title}>Completed (2)</p>
        <Task />
        <Task />
        <Task />
      </div>
    </div>
  )
}

export default TaskGrid
