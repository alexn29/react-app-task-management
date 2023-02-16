import classNames from 'classnames'
import styles from './icon-button.module.scss'

interface Props {
  icon?: string
  isActive?: boolean
  style?: 'outlined' | 'filled'
  onClick: () => void
}
/**
 * @param {string} icon - Remix Icon classname
 */
const IconButton = ({ onClick, icon, isActive, style = 'outlined' }: Props) => {
  return (
    <button
      onClick={onClick}
      className={classNames(styles.button, {
        [styles.active]: isActive,
        [styles.outline]: style === 'outlined',
        [styles.filled]: style === 'filled',
      })}
    >
      <i className={icon} />
    </button>
  )
}

export default IconButton
