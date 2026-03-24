import { clsx as cx } from 'clsx';
import styles from './PostCardSkeleton.module.css';

function SkeletonCard() {
  return (
    <li className={styles['skeleton-card']} aria-hidden="true">
      <div className={styles['skeleton-card__body']}>
        <div className={styles['skeleton-card__content']}>
          {/* Header — mirrors post-card__header */}
          <div className={styles['skeleton-card__header']}>
            <span className={cx(styles.shimmer, styles['shimmer--avatar'])} />
            <div className={styles['skeleton-card__author-info']}>
              <span className={cx(styles.shimmer, styles['shimmer--name'])} />
              <span className={cx(styles.shimmer, styles['shimmer--timestamp'])} />
            </div>
          </div>

          {/* Body row — mirrors post-card--content */}
          <div className={styles['skeleton-card__row']}>
            {/* Vote column — mirrors post-card__vote + VoteControl */}
            <div className={styles['skeleton-card__vote']}>
              <span className={cx(styles.shimmer, styles['shimmer--vote-btn'])} />
              <span className={cx(styles.shimmer, styles['shimmer--vote-count'])} />
              <span className={cx(styles.shimmer, styles['shimmer--vote-btn'])} />
            </div>

            {/* Text — mirrors post-card__text */}
            <div className={styles['skeleton-card__text']}>
              <span className={cx(styles.shimmer, styles['shimmer--line-full'])} />
              <span className={cx(styles.shimmer, styles['shimmer--line-full'])} />
              <span className={cx(styles.shimmer, styles['shimmer--line-partial'])} />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

interface PostCardSkeletonProps {
  count?: number;
}

export function PostCardSkeleton({ count = 4 }: PostCardSkeletonProps) {
  return (
    <ol role="status" aria-label="Loading posts" className={styles['skeleton-list']}>
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </ol>
  );
}
