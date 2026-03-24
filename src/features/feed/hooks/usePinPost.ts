import { useMutation, useQueryClient } from '@tanstack/react-query';
import feedApi from '../api/feedApi';
import { postQueryOptions } from '../api/feedQueryOptions';

export function usePinPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => feedApi.togglePin(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryOptions.all().queryKey });
    },
  });
}
