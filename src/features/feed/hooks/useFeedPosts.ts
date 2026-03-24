import { useQuery } from '@tanstack/react-query';
import { postQueryOptions } from '../api/feedQueryOptions';
import { useFeedStore } from '../store/feedStore';
import type { Post } from '../types';

export interface PostWithUserVote extends Post {
  userVote: 'up' | 'down' | null;
}

export function useFeedPosts() {
  const userVoteById = useFeedStore((s) => s.userVoteById);
  const voteCountDeltaById = useFeedStore((s) => s.voteCountDeltaById);

  const query = useQuery(postQueryOptions.all());

  const posts: PostWithUserVote[] = (query.data ?? [])
    .map((post) => ({
      ...post,
      voteCount: post.voteCount + (voteCountDeltaById[post.id] ?? 0),
      userVote: userVoteById[post.id] ?? null,
    }))
    .sort((a, b) => {
      // Pinned posts always float to the top
      if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
      // Then sort by voteCount descending
      return b.voteCount - a.voteCount;
    });

  return { ...query, posts };
}
