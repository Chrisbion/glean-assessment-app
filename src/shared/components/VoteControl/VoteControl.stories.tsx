import type { Meta, StoryObj } from '@storybook/react-vite';
import { VoteControl } from './index';

const meta = {
  title: 'Shared/VoteControl',
  component: VoteControl,
  tags: ['autodocs'],
  args: {
    count: 12,
    userVote: null,
    onUpvote: () => {},
    onDownvote: () => {},
  },
} satisfies Meta<typeof VoteControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};

export const Upvoted: Story = {
  args: { userVote: 'up', count: 13 },
};

export const Downvoted: Story = {
  args: { userVote: 'down', count: 11 },
};

export const NegativeScore: Story = {
  args: { count: -3 },
};

export const Disabled: Story = {
  args: { disabled: true },
};
