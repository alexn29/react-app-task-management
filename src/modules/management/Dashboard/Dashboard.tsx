import { useState } from 'react'
import type { ViewToggle } from '@app-types/task'
import { Search, TaskGrid, TaskList, TaskModal } from './components'
import { useTaskStore } from '@modules/common/store/useTaskStore'
import { IconButton } from '@modules/common/components/IconButton'
import styles from './dashboard.module.scss'

const Dashboard = () => {
  const [view, setView] = useState<ViewToggle>('grid')
  const [openModal, setOpenModal] = useState<boolean>(false)
  const selectedTask = useTaskStore((s) => s.task)

  return (
    <div className={styles.container}>
      {/* TODO - Add functionality to Search component :) */}
      <Search />

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
        <IconButton
          icon="ri-add-fill"
          onClick={() => {
            setOpenModal(true)
          }}
          style="filled"
        />
      </div>
      {view === 'grid' ? <TaskGrid /> : <TaskList />}
      {openModal || selectedTask !== null ? <TaskModal setOpen={setOpenModal} /> : null}
    </div>
  )
}

export default Dashboard
