import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VoteControl } from './index';

describe('VoteControl', () => {
  it('renders upvote and downvote buttons with accessible labels', () => {
    render(<VoteControl count={5} userVote={null} onUpvote={() => {}} onDownvote={() => {}} />);
    expect(screen.getByRole('button', { name: 'Upvote' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Downvote' })).toBeInTheDocument();
  });

  it('displays the vote count', () => {
    render(<VoteControl count={42} userVote={null} onUpvote={() => {}} onDownvote={() => {}} />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('displays negative vote count', () => {
    render(<VoteControl count={-3} userVote={null} onUpvote={() => {}} onDownvote={() => {}} />);
    expect(screen.getByText('-3')).toBeInTheDocument();
  });

  it('sets aria-pressed on upvote button when user has upvoted', () => {
    render(<VoteControl count={6} userVote="up" onUpvote={() => {}} onDownvote={() => {}} />);
    expect(screen.getByRole('button', { name: 'Upvote' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Downvote' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  it('sets aria-pressed on downvote button when user has downvoted', () => {
    render(<VoteControl count={4} userVote="down" onUpvote={() => {}} onDownvote={() => {}} />);
    expect(screen.getByRole('button', { name: 'Downvote' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: 'Upvote' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('calls onUpvote when upvote button is clicked', async () => {
    const onUpvote = vi.fn();
    render(<VoteControl count={5} userVote={null} onUpvote={onUpvote} onDownvote={() => {}} />);
    await userEvent.click(screen.getByRole('button', { name: 'Upvote' }));
    expect(onUpvote).toHaveBeenCalledOnce();
  });

  it('calls onDownvote when downvote button is clicked', async () => {
    const onDownvote = vi.fn();
    render(<VoteControl count={5} userVote={null} onUpvote={() => {}} onDownvote={onDownvote} />);
    await userEvent.click(screen.getByRole('button', { name: 'Downvote' }));
    expect(onDownvote).toHaveBeenCalledOnce();
  });

  it('does not call callbacks when disabled', async () => {
    const onUpvote = vi.fn();
    const onDownvote = vi.fn();
    render(
      <VoteControl
        count={5}
        userVote={null}
        onUpvote={onUpvote}
        onDownvote={onDownvote}
        disabled
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Upvote' }));
    await userEvent.click(screen.getByRole('button', { name: 'Downvote' }));
    expect(onUpvote).not.toHaveBeenCalled();
    expect(onDownvote).not.toHaveBeenCalled();
  });
});
