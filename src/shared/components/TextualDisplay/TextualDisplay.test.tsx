import { render, screen } from '@testing-library/react';
import { TextualDisplay } from './index';

describe('TextualDisplay', () => {
  it('renders text content', () => {
    render(<TextualDisplay text="Hello world" />);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('renders as a <p> by default', () => {
    render(<TextualDisplay text="Default tag" />);
    expect(screen.getByText('Default tag').tagName).toBe('P');
  });

  it('renders as the specified tag', () => {
    render(<TextualDisplay text="Heading" as="h2" />);
    expect(screen.getByRole('heading', { level: 2, name: 'Heading' })).toBeInTheDocument();
  });

  it('applies the size modifier class', () => {
    render(<TextualDisplay text="Small" size="xs" />);
    expect(screen.getByText('Small')).toHaveAttribute(
      'class',
      expect.stringContaining('textual-display--xs'),
    );
  });

  it('applies the weight modifier class', () => {
    render(<TextualDisplay text="Bold" weight="bold" />);
    expect(screen.getByText('Bold')).toHaveAttribute(
      'class',
      expect.stringContaining('textual-display--bold'),
    );
  });

  it('applies the color modifier class', () => {
    render(<TextualDisplay text="Muted" color="secondary" />);
    expect(screen.getByText('Muted')).toHaveAttribute(
      'class',
      expect.stringContaining('textual-display--secondary'),
    );
  });

  it('applies truncate modifier when truncate is true', () => {
    render(<TextualDisplay text="Long text" truncate />);
    expect(screen.getByText('Long text')).toHaveAttribute(
      'class',
      expect.stringContaining('textual-display--truncate'),
    );
  });

  it('does not apply truncate modifier by default', () => {
    render(<TextualDisplay text="Normal text" />);
    expect(screen.getByText('Normal text')).not.toHaveAttribute(
      'class',
      expect.stringContaining('textual-display--truncate'),
    );
  });
});
