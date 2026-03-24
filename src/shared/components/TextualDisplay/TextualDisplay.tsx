import { clsx as cx } from 'clsx';
import styles from './TextualDisplay.module.css';

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'label';
type Size = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
type Weight = 'normal' | 'medium' | 'semibold' | 'bold';
type Color = 'primary' | 'secondary' | 'tertiary';

interface TextualDisplayProps {
  text: string;
  as?: Tag;
  size?: Size;
  weight?: Weight;
  color?: Color;
  truncate?: boolean;
  className?: string;
}

export function TextualDisplay({
  text,
  as: Tag = 'p',
  size = 'base',
  weight = 'normal',
  color = 'primary',
  truncate = false,
  className,
}: TextualDisplayProps) {
  return (
    <Tag
      className={cx(
        styles['textual-display'],
        styles[`textual-display--${size}`],
        styles[`textual-display--${weight}`],
        styles[`textual-display--${color}`],
        truncate && styles['textual-display--truncate'],
        className,
      )}
    >
      {text}
    </Tag>
  );
}
