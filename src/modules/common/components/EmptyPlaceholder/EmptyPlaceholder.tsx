import styles from './empty-placeholder.module.scss'

const EmptyPlaceholder = () => {
  return (
    <div className={styles.container}>
      <i className="ri-draft-line"></i>
      <p>No tasks found</p>
    </div>
  )
}

export default EmptyPlaceholder
