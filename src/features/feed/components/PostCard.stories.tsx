import type { Meta, StoryObj } from '@storybook/react-vite';
import { PostCard } from './PostCard';

const basePost = {
  id: '1',
  authorId: 'u1',
  authorName: 'Jill Doe',
  content: 'It is raining',
  voteCount: 1,
  isPinned: false,
  createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
};

const meta = {
  title: 'Features/Feed/PostCard',
  component: PostCard,
  tags: ['autodocs'],
  args: {
    post: basePost,
    userVote: null,
    onUpvote: () => {},
    onDownvote: () => {},
    onTogglePin: () => {},
  },
} satisfies Meta<typeof PostCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Upvoted: Story = {
  args: { userVote: 'up', post: { ...basePost, voteCount: 2 } },
};

export const Downvoted: Story = {
  args: { userVote: 'down', post: { ...basePost, voteCount: 0 } },
};

export const Pinned: Story = {
  args: { post: { ...basePost, isPinned: true, voteCount: 42 } },
};

export const LongContent: Story = {
  args: {
    post: {
      ...basePost,
      content:
        'Unpopular opinion: a well-crafted error message is more valuable than the feature it protects. Users remember what broke, not what worked. Invest in your error states as much as your happy paths — they are the moments that define trust.',
      voteCount: 19,
    },
  },
};
