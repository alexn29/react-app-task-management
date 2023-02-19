import Skeleton from 'react-loading-skeleton'
import styles from './grid-skeleton.module.scss'

const GridSkeleton = () => {
  return (
    <Skeleton
      count={3}
      height={200}
      inline
      borderRadius="0.5rem"
      containerClassName={styles.skeletonContainer}
    />
  )
}

export default GridSkeleton
