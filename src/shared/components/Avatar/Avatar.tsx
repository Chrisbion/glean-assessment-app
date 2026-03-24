import { clsx as cx } from 'clsx';
import styles from './Avatar.module.css';

interface AvatarProps {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  return (
    <span className={cx(styles.avatar, styles[`avatar--${size}`], className)}>
      {src ? (
        <img className={styles['avatar__image']} src={src} alt={name} />
      ) : (
        <span className={styles['avatar__initials']} role="img" aria-label={name}>
          {getInitials(name)}
        </span>
      )}
    </span>
  );
}
