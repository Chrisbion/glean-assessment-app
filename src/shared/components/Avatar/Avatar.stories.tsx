import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './index';

const meta = {
  title: 'Shared/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: {
    name: 'Jill Doe',
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SmallInitials: Story = {
  args: { size: 'sm' },
};

export const MediumInitials: Story = {
  args: { size: 'md' },
};

export const LargeInitials: Story = {
  args: { size: 'lg' },
};

export const WithImage: Story = {
  args: {
    size: 'md',
    src: 'https://i.pravatar.cc/40',
  },
};

export const SingleName: Story = {
  args: { name: 'Marcus', size: 'md' },
};
