import { FeedList } from '@/features/feed';
import styles from './FeedPage.module.css';

export default function FeedPage() {
  return (
    <main className={styles['feed-page']}>
      <div className={styles['feed-page__container']}>
        <h1 className={styles['feed-page__heading']}>Social Media Feed</h1>
        <FeedList />
      </div>
    </main>
  );
}
