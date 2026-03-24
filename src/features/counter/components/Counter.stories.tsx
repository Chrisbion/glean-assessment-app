import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useCounterStore } from '../store/counterStore';
import { Counter } from './Counter';

const withInitialCount =
  (count: number): Decorator =>
  (Story) => {
    useCounterStore.setState({ count });
    return <Story />;
  };

const meta = {
  title: 'Features/Counter/Counter',
  component: Counter,
  tags: ['autodocs'],
  argTypes: {
    min: { control: { type: 'number' } },
    max: { control: { type: 'number' } },
  },
} satisfies Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Positive: Story = {
  decorators: [withInitialCount(10)],
};

export const Negative: Story = {
  decorators: [withInitialCount(-5)],
};

export const LargeCount: Story = {
  decorators: [withInitialCount(9999)],
};

export const WithBoundaries: Story = {
  args: { min: -2, max: 2 },
};

export const Interaction: Story = {
  args: { min: -2, max: 2 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const display = canvas.getByLabelText(/current count/i);
    const increment = canvas.getByRole('button', { name: /increment/i });
    const decrement = canvas.getByRole('button', { name: /decrement/i });

    await userEvent.click(increment);
    await userEvent.click(increment);
    await expect(display).toHaveTextContent('2');
    await expect(increment).toBeDisabled();

    await userEvent.click(decrement);
    await userEvent.click(decrement);
    await userEvent.click(decrement);
    await userEvent.click(decrement);
    await expect(display).toHaveTextContent('-2');
    await expect(decrement).toBeDisabled();
  },
};
