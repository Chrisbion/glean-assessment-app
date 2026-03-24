import { render, screen } from '@testing-library/react';
import { Avatar } from './index';

describe('Avatar', () => {
  it('renders initials when no src provided', () => {
    render(<Avatar name="Jill Doe" />);
    expect(screen.getByRole('img', { name: 'Jill Doe' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Jill Doe' })).toHaveTextContent('JD');
  });

  it('renders image when src is provided', () => {
    render(<Avatar name="Jill Doe" src="https://example.com/avatar.jpg" />);
    const img = screen.getByAltText('Jill Doe');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('derives initials from single name', () => {
    render(<Avatar name="Marcus" />);
    expect(screen.getByRole('img', { name: 'Marcus' })).toHaveTextContent('M');
  });

  it('caps initials at two characters', () => {
    render(<Avatar name="Anna Bella Clara" />);
    const initials = screen.getByRole('img', { name: 'Anna Bella Clara' });
    expect(initials.textContent).toHaveLength(2);
  });

  it('applies sm size modifier', () => {
    const { container } = render(<Avatar name="Jill Doe" size="sm" />);
    expect(container.firstChild).toHaveAttribute('class', expect.stringContaining('avatar--sm'));
  });

  it('applies lg size modifier', () => {
    const { container } = render(<Avatar name="Jill Doe" size="lg" />);
    expect(container.firstChild).toHaveAttribute('class', expect.stringContaining('avatar--lg'));
  });

  it('defaults to md size', () => {
    const { container } = render(<Avatar name="Jill Doe" />);
    expect(container.firstChild).toHaveAttribute('class', expect.stringContaining('avatar--md'));
  });
});
