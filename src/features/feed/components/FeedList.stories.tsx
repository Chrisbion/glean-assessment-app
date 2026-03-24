import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { Decorator } from '@storybook/react-vite';
import { FeedList } from './FeedList';
import { postQueryOptions } from '../api/feedQueryOptions';

const fixturePosts = [
  {
    id: '1',
    authorId: 'u1',
    authorName: 'Jill Doe',
    content: 'It is raining',
    voteCount: 42,
    isPinned: true,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    authorId: 'u2',
    authorName: 'Marcus Webb',
    content: 'Just shipped a feature that cuts API response time by 40%.',
    voteCount: 31,
    isPinned: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
];

function makeQueryClient(seed?: () => void) {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  if (seed) seed.call({ qc });
  return qc;
}

const withSeededQuery =
  (seed?: (qc: QueryClient) => void): Decorator =>
  (Story) => {
    const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    seed?.(qc);
    return (
      <QueryClientProvider client={qc}>
        <Story />
      </QueryClientProvider>
    );
  };

const meta = {
  title: 'Features/Feed/FeedList',
  component: FeedList,
  tags: ['autodocs'],
} satisfies Meta<typeof FeedList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoadingState: Story = {
  decorators: [
    (Story) => (
      <QueryClientProvider
        client={
          new QueryClient({
            defaultOptions: {
              queries: { retry: false, staleTime: Infinity },
            },
          })
        }
      >
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export const ErrorState: Story = {
  decorators: [
    withSeededQuery((qc) => {
      qc.setQueryData(postQueryOptions.all().queryKey, () => {
        throw new Error('Network error');
      });
    }),
  ],
};

export const EmptyState: Story = {
  decorators: [
    withSeededQuery((qc) => {
      qc.setQueryData(postQueryOptions.all().queryKey, []);
    }),
  ],
};

export const WithData: Story = {
  decorators: [
    withSeededQuery((qc) => {
      qc.setQueryData(postQueryOptions.all().queryKey, fixturePosts);
    }),
  ],
};

// Suppress unused variable warning
void makeQueryClient;
