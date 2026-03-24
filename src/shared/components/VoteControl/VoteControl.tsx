import { clsx as cx } from 'clsx';
import styles from './VoteControl.module.css';

interface VoteControlProps {
  count: number;
  userVote: 'up' | 'down' | null;
  onUpvote: () => void;
  onDownvote: () => void;
  disabled?: boolean;
  className?: string;
}

export function VoteControl({
  count,
  userVote,
  onUpvote,
  onDownvote,
  disabled = false,
  className,
}: VoteControlProps) {
  return (
    <div className={cx(styles['vote-control'], className)}>
      <button
        type="button"
        className={cx(
          styles['vote-control__button'],
          styles['vote-control__button--up'],
          userVote === 'up' && styles['vote-control__button--active-up'],
        )}
        aria-label="Upvote"
        aria-pressed={userVote === 'up'}
        disabled={disabled}
        onClick={onUpvote}
      >
        ▲
      </button>

      <span className={styles['vote-control__count']} aria-live="polite" aria-atomic="true">
        {count}
      </span>

      <button
        type="button"
        className={cx(
          styles['vote-control__button'],
          styles['vote-control__button--down'],
          userVote === 'down' && styles['vote-control__button--active-down'],
        )}
        aria-label="Downvote"
        aria-pressed={userVote === 'down'}
        disabled={disabled}
        onClick={onDownvote}
      >
        ▼
      </button>
    </div>
  );
}
