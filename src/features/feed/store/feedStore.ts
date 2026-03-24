import { create } from 'zustand';

interface FeedSlice {
  userVoteById: Record<string, 'up' | 'down' | null>;
  voteCountDeltaById: Record<string, number>;
  applyVote: (postId: string, direction: 'up' | 'down') => void;
}

export const useFeedStore = create<FeedSlice>((set) => ({
  userVoteById: {},
  voteCountDeltaById: {},
  applyVote: (postId, direction) =>
    set((state) => {
      const delta = state.voteCountDeltaById[postId] ?? 0;
      return {
        userVoteById: { ...state.userVoteById, [postId]: direction },
        voteCountDeltaById: {
          ...state.voteCountDeltaById,
          [postId]: delta + (direction === 'up' ? 1 : -1),
        },
      };
    }),
}));
