import { useState } from 'react'
import dayjs from 'dayjs'
import Swal from 'sweetalert2'
import { useQuery, useMutation } from '@apollo/client'
import type { Dispatch, SetStateAction } from 'react'
import type { DropdownItemProps } from 'semantic-ui-react'
import type { User } from '@app-types/user'
import type { PointEstimate, TaskStatus } from '@app-types/task'
import { Modal, Button, Dropdown, Input, Grid } from 'semantic-ui-react'
import { text2Number } from '@modules/common/utils'
import { useTaskStore } from '@modules/common/store/useTaskStore'
import { GET_USERS, GET_POINT_ESTIMATE, GET_TAGS, GET_STATUS, GET_TASKS } from '@graphql/queries'
import { CREATE_TASK, EDIT_TASK } from '@graphql/mutations'
import styles from './task-modal.module.scss'

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>
}
const TaskModal = ({ setOpen }: Props) => {
  const { data: originalUsers } = useQuery(GET_USERS)
  const [createUser, { loading: isCreating }] = useMutation(CREATE_TASK)
  const [updateTask, { loading: isEditting }] = useMutation(EDIT_TASK)

  const selectedTask = useTaskStore((s) => s.task)
  const setSelectedTask = useTaskStore((s) => s.setTask)

  const [name, setName] = useState<string | null>(selectedTask?.name ?? null)
  const [pointEstimate, setPointEstimate] = useState<PointEstimate | null>(
    selectedTask?.pointEstimate ?? null
  )
  const [assigneeId, setAssigneeId] = useState<string | null>(selectedTask?.assignee.id ?? null)
  const [dueDate, setDueDate] = useState<string | null>(
    selectedTask !== null ? dayjs(selectedTask?.dueDate).format('YYYY-MM-DD') : null
  )
  const [tags, setTags] = useState<string[]>(selectedTask?.tags ?? [])
  const [status, setStatus] = useState<TaskStatus | null>(selectedTask?.status ?? null)

  let formattedPoints: DropdownItemProps[] = []
  let formattedTags: DropdownItemProps[] = []
  let formattedStatus: DropdownItemProps[] = []
  let formattedUsers: DropdownItemProps[] | undefined = []

  formattedPoints = GET_POINT_ESTIMATE().map((point) => {
    return {
      key: point,
      text: `${text2Number(point)} Points`,
      value: point,
      icon: 'plus',
    }
  })

  formattedTags = GET_TAGS().map((tag) => {
    return {
      key: tag,
      text: tag,
      value: tag,
      icon: 'plus',
    }
  })

  formattedStatus = GET_STATUS().map((status) => {
    return {
      key: status,
      text: status,
      value: status,
    }
  })

  if (originalUsers?.users !== null) {
    formattedUsers = originalUsers?.users.map((user: User) => {
      return {
        key: user.id,
        text: user.fullName,
        value: user.id,
        image: {
          avatar: true,
          src: user.avatar,
        },
      }
    })
  }

  const handleSubmit = () => {
    if (selectedTask !== null) {
      updateTask({
        variables: {
          input: {
            assigneeId,
            dueDate: new Date(dueDate as string),
            id: selectedTask.id,
            name,
            pointEstimate,
            status,
            tags,
          },
        },
        refetchQueries: [
          {
            query: GET_TASKS,
            variables: {
              input: {
                status,
              },
            },
          },
          {
            query: GET_TASKS,
            variables: {
              input: {
                status: selectedTask.status,
              },
            },
          },
        ],
      })
        .then(() => {
          setOpen(false)
          setSelectedTask(null)
          void Swal.fire({ icon: 'success', text: 'Task updated successfully' })
        })
        .catch((error) => {
          console.log('Error while editing the task: ', error)
        })
    } else {
      createUser({
        variables: {
          input: { assigneeId, dueDate, name, pointEstimate, status, tags },
        },
        refetchQueries: [
          {
            query: GET_TASKS,
            variables: {
              input: {
                status,
              },
            },
          },
        ],
      })
        .then(() => {
          setOpen(false)
          setSelectedTask(null)
          void Swal.fire({ icon: 'success', text: 'Task created successfully' })
        })
        .catch((error) => {
          console.log('Error while creating the task: ', error)
        })
    }
  }

  const isFormValid =
    name !== null &&
    pointEstimate !== null &&
    assigneeId !== null &&
    dueDate !== null &&
    tags.length > 0 &&
    status !== null

  return (
    <Modal
      className={styles.modal}
      closeOnDocumentClick={false}
      closeOnDimmerClick={false}
      onClose={() => {
        setOpen(false)
      }}
      onOpen={() => {
        setOpen(true)
      }}
      open
    >
      <Modal.Header className="modal-header">{`${
        selectedTask !== null ? 'Edit' : 'Create'
      } Task`}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Grid columns="equal">
            <Grid.Row>
              <Grid.Column>
                <Input
                  placeholder="Task Title"
                  fluid
                  defaultValue={name}
                  onChange={(_, { value }) => {
                    setName(value)
                  }}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Dropdown
                  name="pointEstimate"
                  button
                  floating
                  labeled
                  clearable
                  fluid
                  className="icon"
                  header="Estimate"
                  options={formattedPoints}
                  placeholder="Estimate"
                  icon="plus"
                  defaultValue={pointEstimate as PointEstimate}
                  onChange={(_, { value }) => {
                    if (value !== '') {
                      const pointEstimate = value as PointEstimate
                      setPointEstimate(pointEstimate)
                    } else {
                      setPointEstimate(null)
                    }
                  }}
                />
              </Grid.Column>

              <Grid.Column>
                <Dropdown
                  button
                  floating
                  labeled
                  clearable
                  fluid
                  className="icon"
                  header="Assign To..."
                  options={formattedUsers}
                  placeholder="Assignee"
                  icon="user"
                  defaultValue={assigneeId as string}
                  onChange={(_, { value }) => {
                    setAssigneeId(value as string)
                  }}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Input
                  type="date"
                  fluid
                  defaultValue={dueDate}
                  onChange={(_, { value: dueDate }) => {
                    if (dueDate !== '') {
                      setDueDate(dayjs(dueDate).format('YYYY-MM-DD'))
                    } else {
                      setDueDate(null)
                    }
                  }}
                />
              </Grid.Column>
              <Grid.Column>
                <Dropdown
                  button
                  floating
                  labeled
                  clearable
                  fluid
                  className="icon"
                  header="Task Status"
                  options={formattedStatus}
                  placeholder="Status"
                  icon="tasks"
                  defaultValue={status as TaskStatus}
                  onChange={(_, { value }) => {
                    if (value !== '') {
                      const status = value as TaskStatus
                      setStatus(status)
                    } else {
                      setStatus(null)
                    }
                  }}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Dropdown
                  placeholder="Skills"
                  fluid
                  multiple
                  selection
                  options={formattedTags}
                  defaultValue={tags}
                  onChange={(_, { value }) => {
                    const tags = value as string[]
                    setTags(tags)
                  }}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Cancel"
          onClick={() => {
            setOpen(false)
            selectedTask !== null && setSelectedTask(null)
          }}
        />
        <Button
          className={styles.btnPrimary}
          content={selectedTask !== null ? 'Save changes' : 'Create'}
          onClick={handleSubmit}
          disabled={!isFormValid || isCreating}
          loading={isCreating || isEditting}
        />
      </Modal.Actions>
    </Modal>
  )
}

export default TaskModal
