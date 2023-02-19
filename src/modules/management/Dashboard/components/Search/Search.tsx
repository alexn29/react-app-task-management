import Avatar from '@assets/images/avatars/avatar-1.png'
import styles from './search.module.scss'

const Search = () => {
  return (
    <div className={styles.container}>
      <span className="ri-search-line icon" />
      <input type="text" placeholder="Search" />
      <span className="ri-notification-3-line icon" />
      <img src={Avatar} alt="" />
    </div>
  )
}

export default Search
