import { clsx as cx } from 'clsx';
import { Avatar } from '@/shared/components/Avatar';
import { TextualDisplay } from '@/shared/components/TextualDisplay';
import { VoteControl } from '@/shared/components/VoteControl';
import type { Post } from '../types';
import styles from './PostCard.module.css';

interface PostCardProps {
  post: Post;
  userVote: 'up' | 'down' | null;
  onUpvote: () => void;
  onDownvote: () => void;
  onTogglePin: () => void;
  isPinPending?: boolean;
}
function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function PostCard({
  post,
  userVote,
  onUpvote,
  onDownvote,
  onTogglePin,
  isPinPending = false,
}: PostCardProps) {
  return (
    <article className={cx(styles['post-card'], post.isPinned && styles['post-card--pinned'])}>
      {/* Pin button — always visible when pinned, revealed on hover otherwise */}
      <button
        type="button"
        className={cx(
          styles['post-card__pin-button'],
          post.isPinned && styles['post-card__pin-button--pinned'],
        )}
        aria-label={post.isPinned ? 'Unpin post' : 'Pin post'}
        aria-pressed={post.isPinned}
        disabled={isPinPending}
        onClick={onTogglePin}
      >
        {post.isPinned ? '📌' : '📍'}
      </button>

      <div className={styles['post-card__body']}>
        {/* Content column */}
        <div className={styles['post-card__content']}>
          <header className={styles['post-card__header']}>
            <Avatar name={post.authorName} src={post.authorAvatar} size="md" />
            <div className={styles['post-card__author-info']}>
              <TextualDisplay
                text={post.authorName}
                as="span"
                size="sm"
                weight="semibold"
                className={styles['post-card__author-name']}
              />
              <TextualDisplay
                text={formatRelativeTime(post.createdAt)}
                as="span"
                size="xs"
                color="tertiary"
                className={styles['post-card__timestamp']}
              />
            </div>
          </header>

          <div className={styles['post-card--content']}>
            {/* Vote column */}
            <VoteControl
              count={post.voteCount}
              userVote={userVote}
              onUpvote={onUpvote}
              onDownvote={onDownvote}
              className={styles['post-card__vote']}
            />
            <div className={styles['post-card__text-clamp']}>
              <TextualDisplay
                text={post.content}
                as="p"
                size="sm"
                color="primary"
                className={styles['post-card__text']}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
