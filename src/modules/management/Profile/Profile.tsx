import dayjs from 'dayjs'
import { useQuery } from '@apollo/client'
import Skeleton from 'react-loading-skeleton'
import type { User } from '@app-types/user'
import { GET_USER_PROFILE } from '@graphql/queries'
import styles from './profile.module.scss'

const Profile = () => {
  const { data, loading } = useQuery<{ profile: User }>(GET_USER_PROFILE)
  const createdAt = dayjs(data?.profile.createdAt).format('MM-DD-YYYY hh:mm A')
  const updatedAt = dayjs(data?.profile.updatedAt).format('MM-DD-YYYY hh:mm A')

  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <i className="ri-user-fill" />
      </div>
      <div className={styles.info}>
        <h1>
          {loading ? <Skeleton borderRadius="0.5rem" inline width={200} /> : data?.profile.fullName}
        </h1>
        <p>
          {loading ? <Skeleton borderRadius="0.5rem" inline width={150} /> : data?.profile.email}
        </p>
        <p>
          {loading ? <Skeleton borderRadius="0.5rem" inline width={125} /> : data?.profile.type}
        </p>
        <p>
          {loading ? (
            <Skeleton borderRadius="0.5rem" inline width={125} />
          ) : (
            `Created: ${createdAt}`
          )}
        </p>
        <p>
          {loading ? (
            <Skeleton borderRadius="0.5rem" inline width={125} />
          ) : (
            `Updated: ${updatedAt}`
          )}
        </p>
      </div>
    </div>
  )
}

export default Profile
