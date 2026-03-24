import { queryOptions } from '@tanstack/react-query';
import feedApi from './feedApi';

export const postQueryOptions = {
  all: () =>
    queryOptions({
      queryKey: ['posts'],
      queryFn: feedApi.getAll,
      staleTime: 5 * 60 * 1000,
    }),
};
