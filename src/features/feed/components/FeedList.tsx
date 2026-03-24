import styles from './FeedList.module.css';
import { useFeedPosts } from '../hooks/useFeedPosts';
import { useVotePost } from '../hooks/useVotePost';
import { usePinPost } from '../hooks/usePinPost';
import { PostCard } from './PostCard';
import { PostCardSkeleton } from './PostCardSkeleton';

export function FeedList() {
  const { posts, isLoading, isError, refetch } = useFeedPosts();
  const vote = useVotePost();
  const { mutate: togglePin, isPending: isPinPending } = usePinPost();

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

  return (
    <ol className={styles['feed-list']} aria-label="Posts">
      {posts.map((post) => (
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
  );
}
