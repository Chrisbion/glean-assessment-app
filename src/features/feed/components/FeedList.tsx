import { useState } from 'react';
import styles from './FeedList.module.css';
import { useFeedPosts } from '../hooks/useFeedPosts';
import { useVotePost } from '../hooks/useVotePost';
import { usePinPost } from '../hooks/usePinPost';
import { PostCard } from './PostCard';
import { PostCardSkeleton } from './PostCardSkeleton';

const INITIAL_VISIBLE = 2;
const PAGE_SIZE = 5;

export function FeedList() {
  const { posts, isLoading, isError, refetch } = useFeedPosts();
  const vote = useVotePost();
  const { mutate: togglePin, isPending: isPinPending } = usePinPost();
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  if (isLoading) {
    return <PostCardSkeleton />;
  }

  if (isError) {
    return (
      <div className={styles['feed-list__error']} role="alert">
        <p>Something went wrong loading posts.</p>
        <button type="button" onClick={() => refetch()}>
          Retry
        </button>
      </div>
    );
  }

  if (!posts.length) {
    return (
      <p className={styles['feed-list__empty']}>No posts yet. Be the first to share something!</p>
    );
  }

  const pinnedPosts = posts.filter((p) => p.isPinned);
  const unpinnedPosts = posts.filter((p) => !p.isPinned);
  const visibleUnpinned = unpinnedPosts.slice(0, visibleCount);
  const remainingCount = unpinnedPosts.length - visibleCount;

  return (
    <>
      <ol className={styles['feed-list']} aria-label="Posts">
        {[...pinnedPosts, ...visibleUnpinned].map((post) => (
          <li key={post.id} className={styles['feed-list__item']}>
            <PostCard
              post={post}
              userVote={post.userVote}
              onUpvote={() => vote(post.id, 'up')}
              onDownvote={() => vote(post.id, 'down')}
              onTogglePin={() => togglePin(post.id)}
              isPinPending={isPinPending}
            />
          </li>
        ))}
      </ol>
      {remainingCount > 0 && (
        <button
          type="button"
          className={styles['feed-list__show-more']}
          onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
        >
          Show {Math.min(remainingCount, PAGE_SIZE)} more{' '}
          {Math.min(remainingCount, PAGE_SIZE) === 1 ? 'post' : 'posts'}
        </button>
      )}
    </>
  );
}
