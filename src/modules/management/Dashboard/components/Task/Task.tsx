import classNames from 'classnames'
import Avatar from '@assets/images/avatars/avatar-1.png'
import { IconButton } from '@modules/common/components/IconButton'
import styles from './task.module.scss'

const Task = () => {
  return (
    <div className={styles.taskContainer}>
      <div className={classNames(styles.row, styles.titleContainer)}>
        <h3>Slack</h3>
        <IconButton icon="ri-more-fill" onClick={() => {}} />
      </div>
      <div className={classNames(styles.row, styles.dueDateContainer)}>
        <p>4 points</p>
        <div className={styles.dueDate}>
          <i className="ri-timer-line"></i>
          <span>Today</span>
        </div>
      </div>
      <div className={classNames(styles.row, styles.tagsContainer)}>
        <div className={classNames(styles.tag, styles.secondary)}>IOS APP</div>
        <div className={classNames(styles.tag, styles.tertiary)}>ANDROID</div>
      </div>
      <div>
        <img src={Avatar} alt="" />
        <div></div>
      </div>
    </div>
  )
}

export default Task
