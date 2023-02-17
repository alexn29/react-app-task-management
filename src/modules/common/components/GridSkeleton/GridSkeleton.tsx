import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from './grid-skeleton.module.scss'

const GridSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <Skeleton
        count={3}
        height={200}
        inline
        borderRadius="0.5rem"
        containerClassName={styles.skeletonContainer}
      />
    </SkeletonTheme>
  )
}

export default GridSkeleton
