import { useFeedStore } from '../store/feedStore';

export function useVotePost() {
  return useFeedStore((s) => s.applyVote);
}
