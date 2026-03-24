import { Button } from '@/shared/components/Button';
import { useCounterStore } from '../store/counterStore';
import styles from './Counter.module.css';

interface CounterProps {
  min?: number;
  max?: number;
}

export function Counter({ min, max }: CounterProps) {
  const { count, increment, decrement, reset } = useCounterStore();

  const atMin = min !== undefined && count <= min;
  const atMax = max !== undefined && count >= max;

  return (
    <section className={styles.counter} aria-label="Counter">
      <p
        className={styles['counter__display']}
        aria-live="polite"
        aria-label={`Current count: ${count}`}
      >
        {count}
      </p>
      <div className={styles['counter__controls']}>
        <Button
          variant="secondary"
          size="lg"
          onClick={decrement}
          aria-label="Decrement"
          disabled={atMin}
        >
          −
        </Button>
        <Button variant="secondary" size="lg" onClick={reset}>
          Reset
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={increment}
          aria-label="Increment"
          disabled={atMax}
        >
          +
        </Button>
      </div>
    </section>
  );
}
