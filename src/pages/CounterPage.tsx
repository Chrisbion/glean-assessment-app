import { Counter } from '@/features/counter';
import styles from './CounterPage.module.css';

export default function CounterPage() {
  return (
    <article className={styles['counter-page']}>
      <h1 className={styles['counter-page__heading']}>Counter</h1>
      <Counter />
    </article>
  );
}
