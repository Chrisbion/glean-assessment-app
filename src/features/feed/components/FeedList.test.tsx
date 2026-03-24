import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderWithQuery } from '@/shared/test-utils';
import { FeedList } from './FeedList';
import * as feedApiModule from '../api/feedApi';
import { useFeedStore } from '../store/feedStore';

vi.mock('../api/feedApi', () => ({
  default: {
    getAll: vi.fn(),
    votePost: vi.fn(),
    togglePin: vi.fn(),
  },
}));

const mockPosts = [
  {
    id: '1',
    authorId: 'u1',
    authorName: 'Jill Doe',
    content: 'It is raining',
    voteCount: 42,
    isPinned: true,
    createdAt: new Date(Date.now() - 3_600_000).toISOString(),
  },
  {
    id: '2',
    authorId: 'u2',
    authorName: 'Marcus Webb',
    content: 'API performance tip',
    voteCount: 10,
    isPinned: false,
    createdAt: new Date(Date.now() - 7_200_000).toISOString(),
  },
];

describe('FeedList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useFeedStore.setState({ userVoteById: {}, voteCountDeltaById: {} });
  });

  it('shows loading spinner while query is pending', () => {
    vi.mocked(feedApiModule.default.getAll).mockReturnValue(new Promise(() => {}));
    renderWithQuery(<FeedList />);
    expect(screen.getByRole('status', { name: /loading posts/i })).toBeInTheDocument();
  });

  it('shows error alert with retry button on failure', async () => {
    vi.mocked(feedApiModule.default.getAll).mockRejectedValue(new Error('Network error'));
    renderWithQuery(<FeedList />);
    await screen.findByRole('alert');
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });

  it('shows empty state when no posts returned', async () => {
    vi.mocked(feedApiModule.default.getAll).mockResolvedValue([]);
    renderWithQuery(<FeedList />);
    await screen.findByText(/no posts yet/i);
  });

  it('renders post list on success', async () => {
    vi.mocked(feedApiModule.default.getAll).mockResolvedValue(mockPosts);
    renderWithQuery(<FeedList />);
    await screen.findByText('Jill Doe');
    expect(screen.getByText('Marcus Webb')).toBeInTheDocument();
  });

  it('pins pinned posts at the top', async () => {
    vi.mocked(feedApiModule.default.getAll).mockResolvedValue(mockPosts);
    renderWithQuery(<FeedList />);
    const items = await screen.findAllByRole('listitem');
    expect(items[0]).toHaveTextContent('Jill Doe');
  });

  it('increments vote count when upvote is clicked', async () => {
    vi.mocked(feedApiModule.default.getAll).mockResolvedValue(mockPosts);
    renderWithQuery(<FeedList />);
    await screen.findByText('Jill Doe');
    const upvotes = screen.getAllByRole('button', { name: 'Upvote' });
    await userEvent.click(upvotes[0]);
    await waitFor(() => {
      expect(screen.getByText('43')).toBeInTheDocument();
    });
  });

  it('calls togglePin when pin button is clicked', async () => {
    vi.mocked(feedApiModule.default.getAll).mockResolvedValue(mockPosts);
    vi.mocked(feedApiModule.default.togglePin).mockResolvedValue({
      ...mockPosts[0],
      isPinned: false,
    });
    renderWithQuery(<FeedList />);
    await screen.findByText('Jill Doe');
    await userEvent.click(screen.getByRole('button', { name: 'Unpin post' }));
    await waitFor(() => {
      expect(feedApiModule.default.togglePin).toHaveBeenCalledWith('1');
    });
  });
});
