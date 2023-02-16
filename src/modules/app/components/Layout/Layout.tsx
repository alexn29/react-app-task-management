import { Outlet } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import styles from './layout.module.scss'

const Layout = () => {
  return (
    <div className={styles.container}>
      <aside className={styles.aside}>
        <Sidebar />
      </aside>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
