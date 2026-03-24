import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { useCounterStore } from '../store/counterStore';
import { Counter } from './Counter';

beforeEach(() => {
  useCounterStore.setState({ count: 0 });
});

describe('Counter', () => {
  it('renders with accessible landmark', () => {
    render(<Counter />);
    expect(screen.getByRole('region', { name: /counter/i })).toBeInTheDocument();
  });

  it('displays initial count of 0', () => {
    render(<Counter />);
    expect(screen.getByLabelText(/current count: 0/i)).toBeInTheDocument();
  });

  it('renders increment, decrement and reset buttons', () => {
    render(<Counter />);
    expect(screen.getByRole('button', { name: /increment/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /decrement/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });

  it('increments the count when increment is clicked', async () => {
    render(<Counter />);
    await userEvent.click(screen.getByRole('button', { name: /increment/i }));
    expect(screen.getByLabelText(/current count: 1/i)).toBeInTheDocument();
  });

  it('decrements the count when decrement is clicked', async () => {
    useCounterStore.setState({ count: 5 });
    render(<Counter />);
    await userEvent.click(screen.getByRole('button', { name: /decrement/i }));
    expect(screen.getByLabelText(/current count: 4/i)).toBeInTheDocument();
  });

  it('resets the count to 0 when reset is clicked', async () => {
    useCounterStore.setState({ count: 10 });
    render(<Counter />);
    await userEvent.click(screen.getByRole('button', { name: /reset/i }));
    expect(screen.getByLabelText(/current count: 0/i)).toBeInTheDocument();
  });

  describe('max boundary', () => {
    it('disables increment when count equals max', () => {
      useCounterStore.setState({ count: 5 });
      render(<Counter max={5} />);
      expect(screen.getByRole('button', { name: /increment/i })).toBeDisabled();
    });

    it('enables increment when count is below max', () => {
      useCounterStore.setState({ count: 4 });
      render(<Counter max={5} />);
      expect(screen.getByRole('button', { name: /increment/i })).not.toBeDisabled();
    });

    it('disables increment after clicking up to max', async () => {
      useCounterStore.setState({ count: 4 });
      render(<Counter max={5} />);
      await userEvent.click(screen.getByRole('button', { name: /increment/i }));
      expect(screen.getByLabelText(/current count: 5/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /increment/i })).toBeDisabled();
    });

    it('does not disable decrement when max is set', () => {
      render(<Counter max={5} />);
      expect(screen.getByRole('button', { name: /decrement/i })).not.toBeDisabled();
    });
  });

  describe('min boundary', () => {
    it('disables decrement when count equals min', () => {
      useCounterStore.setState({ count: -5 });
      render(<Counter min={-5} />);
      expect(screen.getByRole('button', { name: /decrement/i })).toBeDisabled();
    });

    it('enables decrement when count is above min', () => {
      useCounterStore.setState({ count: -4 });
      render(<Counter min={-5} />);
      expect(screen.getByRole('button', { name: /decrement/i })).not.toBeDisabled();
    });

    it('disables decrement after clicking down to min', async () => {
      useCounterStore.setState({ count: -4 });
      render(<Counter min={-5} />);
      await userEvent.click(screen.getByRole('button', { name: /decrement/i }));
      expect(screen.getByLabelText(/current count: -5/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /decrement/i })).toBeDisabled();
    });

    it('does not disable increment when min is set', () => {
      render(<Counter min={-5} />);
      expect(screen.getByRole('button', { name: /increment/i })).not.toBeDisabled();
    });
  });

  describe('no boundaries', () => {
    it('never disables increment without max prop', () => {
      render(<Counter />);
      expect(screen.getByRole('button', { name: /increment/i })).not.toBeDisabled();
    });

    it('never disables decrement without min prop', () => {
      render(<Counter />);
      expect(screen.getByRole('button', { name: /decrement/i })).not.toBeDisabled();
    });
  });
});
