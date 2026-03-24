import { beforeEach, describe, expect, it } from 'vitest';
import { useCounterStore } from './counterStore';

beforeEach(() => {
  useCounterStore.setState({ count: 0 });
});

describe('counterStore', () => {
  it('has initial count of 0', () => {
    expect(useCounterStore.getState().count).toBe(0);
  });

  it('increment increases count by 1', () => {
    useCounterStore.getState().increment();
    expect(useCounterStore.getState().count).toBe(1);
  });

  it('increment is cumulative', () => {
    useCounterStore.getState().increment();
    useCounterStore.getState().increment();
    useCounterStore.getState().increment();
    expect(useCounterStore.getState().count).toBe(3);
  });

  it('decrement decreases count by 1', () => {
    useCounterStore.setState({ count: 5 });
    useCounterStore.getState().decrement();
    expect(useCounterStore.getState().count).toBe(4);
  });

  it('decrement goes below zero', () => {
    useCounterStore.getState().decrement();
    expect(useCounterStore.getState().count).toBe(-1);
  });

  it('reset sets count back to 0', () => {
    useCounterStore.setState({ count: 99 });
    useCounterStore.getState().reset();
    expect(useCounterStore.getState().count).toBe(0);
  });
});
