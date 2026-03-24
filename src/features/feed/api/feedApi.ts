import { postListSchema, postSchema } from '../types/schemas';
import type { Post } from '../types';

const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    authorId: 'u1',
    authorName: 'Jill Doe',
    authorAvatar: undefined,
    content: 'It is raining',
    voteCount: 42,
    isPinned: true,
    createdAt: '2026-03-24T10:00:00.000Z',
  },
  {
    id: '2',
    authorId: 'u2',
    authorName: 'Marcus Webb',
    authorAvatar: undefined,
    content:
      'Just shipped a new feature that cuts our API response time by 40%. The secret? Stop fetching data you never render.',
    voteCount: 31,
    isPinned: false,
    createdAt: '2026-03-23T14:22:00.000Z',
  },
  {
    id: '3',
    authorId: 'u3',
    authorName: 'Priya Nair',
    authorAvatar: undefined,
    content:
      "Hot take: the best documentation is code so clear it needs no comments. Disagree? Show me a comment that couldn't be a better variable name.",
    voteCount: 27,
    isPinned: false,
    createdAt: '2026-03-22T09:15:00.000Z',
  },
  {
    id: '4',
    authorId: 'u4',
    authorName: 'Devon Cross',
    authorAvatar: undefined,
    content:
      'Three hours debugging. The bug was a missing semicolon in a config file that nobody edits. I need a break.',
    voteCount: 19,
    isPinned: false,
    createdAt: '2026-03-22T17:45:00.000Z',
  },
  {
    id: '5',
    authorId: 'u5',
    authorName: 'Yuki Tanaka',
    authorAvatar: undefined,
    content:
      'Reminder that "move fast and break things" was never meant to apply to production databases. Back up your data.',
    voteCount: 15,
    isPinned: false,
    createdAt: '2026-03-21T11:30:00.000Z',
  },
  {
    id: '6',
    authorId: 'u6',
    authorName: 'Amara Osei',
    authorAvatar: undefined,
    content:
      'Finally migrated our entire test suite from Jest to Vitest. Build time went from 4 minutes to 45 seconds. Highly recommend.',
    voteCount: 8,
    isPinned: false,
    createdAt: '2026-03-20T16:00:00.000Z',
  },
  {
    id: '7',
    authorId: 'u7',
    authorName: 'Leo Hartmann',
    authorAvatar: undefined,
    content:
      'Is it just me or does every side project start the same way: "I\'ll keep it simple this time."',
    voteCount: 3,
    isPinned: false,
    createdAt: '2026-03-19T08:10:00.000Z',
  },
  {
    id: '8',
    authorId: 'u8',
    authorName: 'Sofia Reyes',
    authorAvatar: undefined,
    content:
      'Unpopular opinion: a well-crafted error message is more valuable than the feature it protects. Users remember what broke, not what worked.',
    voteCount: -2,
    isPinned: false,
    createdAt: '2026-03-18T20:55:00.000Z',
  },
];

const feedApi = {
  getAll: async (): Promise<Post[]> => {
    await delay(400);
    return postListSchema.parse(MOCK_POSTS);
  },

  votePost: async (postId: string, direction: 'up' | 'down'): Promise<Post> => {
    await delay(200);
    const post = MOCK_POSTS.find((p) => p.id === postId);
    if (!post) throw new Error(`Post ${postId} not found`);
    return postSchema.parse({ ...post, voteCount: post.voteCount + (direction === 'up' ? 1 : -1) });
  },

  togglePin: async (postId: string): Promise<Post> => {
    await delay(200);
    const post = MOCK_POSTS.find((p) => p.id === postId);
    if (!post) throw new Error(`Post ${postId} not found`);
    post.isPinned = !post.isPinned;
    return postSchema.parse(post);
  },
};

export default feedApi;
