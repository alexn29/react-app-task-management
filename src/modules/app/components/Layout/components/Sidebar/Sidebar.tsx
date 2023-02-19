import { NavLink } from 'react-router-dom'
import Logo from '@assets/images/logo.svg'
import styles from './sidebar.module.scss'

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <img src={Logo} className={styles.logo} width="40" height="36" />
      <ul className={styles.menu}>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : '')}>
            <i className="ri-layout-grid-fill"></i>
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? styles.active : '')}>
            <i className="ri-user-fill"></i>
            <span>Profile</span>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
