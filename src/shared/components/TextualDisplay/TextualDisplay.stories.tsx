import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextualDisplay } from './index';

const meta = {
  title: 'Shared/TextualDisplay',
  component: TextualDisplay,
  tags: ['autodocs'],
  args: {
    text: 'The quick brown fox jumps over the lazy dog.',
  },
} satisfies Meta<typeof TextualDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading: Story = {
  args: { as: 'h2', size: '2xl', weight: 'bold' },
};

export const Body: Story = {
  args: { as: 'p', size: 'base', weight: 'normal' },
};

export const Caption: Story = {
  args: { as: 'span', size: 'xs', color: 'tertiary' },
};

export const Secondary: Story = {
  args: { size: 'sm', color: 'secondary' },
};

export const Truncated: Story = {
  args: {
    text: 'This is a very long piece of text that will be truncated when it exceeds the available width of its container.',
    truncate: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Semibold: Story = {
  args: { weight: 'semibold' },
};
