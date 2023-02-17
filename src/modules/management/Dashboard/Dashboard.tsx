import { useState } from 'react'
import type { ViewToggle } from '@app-types/tasks'
import { TaskGrid, TaskList } from './components'
import { IconButton } from '@modules/common/components/IconButton'

import styles from './dashboard.module.scss'

const Dashboard = () => {
  const [view, setView] = useState<ViewToggle>('grid')

  return (
    <div className={styles.container}>
      <div className={styles.actionButtons}>
        <div>
          <IconButton
            icon="ri-layout-grid-fill"
            onClick={() => {
              setView('grid')
            }}
            isActive={view === 'grid'}
          />
          <IconButton
            icon="ri-menu-line"
            onClick={() => {
              setView('list')
            }}
            isActive={view === 'list'}
          />
        </div>
        <IconButton icon="ri-add-fill" onClick={() => {}} style="filled" />
      </div>
      {view === 'grid' ? <TaskGrid /> : <TaskList />}
    </div>
  )
}

export default Dashboard
