import styles from './error-placeholder.module.scss'

interface Props {
  icon: string
  title: string
  description?: string
}

/**
 * @param {string} icon - Remix Icon classname
 */
const ErrorPlaceholder = ({ icon, title, description }: Props) => {
  return (
    <div className={styles.container}>
      <i className={icon}></i>
      <h1>{title}</h1>
      {description !== null && <p>{description}</p>}
    </div>
  )
}

export default ErrorPlaceholder
