import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PostCard } from './PostCard';

const basePost = {
  id: '1',
  authorId: 'u1',
  authorName: 'Jill Doe',
  content: 'It is raining',
  voteCount: 1,
  isPinned: false,
  createdAt: new Date(Date.now() - 60_000).toISOString(),
};

describe('PostCard', () => {
  it('renders author name', () => {
    render(
      <PostCard
        post={basePost}
        userVote={null}
        onUpvote={() => {}}
        onDownvote={() => {}}
        onTogglePin={() => {}}
      />,
    );
    expect(screen.getByText('Jill Doe')).toBeInTheDocument();
  });

  it('renders post content', () => {
    render(
      <PostCard
        post={basePost}
        userVote={null}
        onUpvote={() => {}}
        onDownvote={() => {}}
        onTogglePin={() => {}}
      />,
    );
    expect(screen.getByText('It is raining')).toBeInTheDocument();
  });

  it('renders vote count', () => {
    render(
      <PostCard
        post={basePost}
        userVote={null}
        onUpvote={() => {}}
        onDownvote={() => {}}
        onTogglePin={() => {}}
      />,
    );
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('calls onUpvote when upvote is clicked', async () => {
    const onUpvote = vi.fn();
    render(
      <PostCard
        post={basePost}
        userVote={null}
        onUpvote={onUpvote}
        onDownvote={() => {}}
        onTogglePin={() => {}}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Upvote' }));
    expect(onUpvote).toHaveBeenCalledOnce();
  });

  it('calls onDownvote when downvote is clicked', async () => {
    const onDownvote = vi.fn();
    render(
      <PostCard
        post={basePost}
        userVote={null}
        onUpvote={() => {}}
        onDownvote={onDownvote}
        onTogglePin={() => {}}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Downvote' }));
    expect(onDownvote).toHaveBeenCalledOnce();
  });

  it('shows "Unpin post" label when post is pinned', () => {
    render(
      <PostCard
        post={{ ...basePost, isPinned: true }}
        userVote={null}
        onUpvote={() => {}}
        onDownvote={() => {}}
        onTogglePin={() => {}}
      />,
    );
    expect(screen.getByRole('button', { name: 'Unpin post' })).toBeInTheDocument();
  });

  it('shows "Pin post" label when post is not pinned', () => {
    render(
      <PostCard
        post={basePost}
        userVote={null}
        onUpvote={() => {}}
        onDownvote={() => {}}
        onTogglePin={() => {}}
      />,
    );
    expect(screen.getByRole('button', { name: 'Pin post' })).toBeInTheDocument();
  });

  it('calls onTogglePin when pin button is clicked', async () => {
    const onTogglePin = vi.fn();
    render(
      <PostCard
        post={basePost}
        userVote={null}
        onUpvote={() => {}}
        onDownvote={() => {}}
        onTogglePin={onTogglePin}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Pin post' }));
    expect(onTogglePin).toHaveBeenCalledOnce();
  });
});
