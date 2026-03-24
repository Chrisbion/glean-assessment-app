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
  {
    id: '9',
    authorId: 'u9',
    authorName: 'Tariq Musa',
    authorAvatar: undefined,
    content:
      'Code review tip: if you find yourself writing "this is a bit confusing" three times, that\'s a refactor waiting to happen.',
    voteCount: 11,
    isPinned: false,
    createdAt: '2026-03-17T13:20:00.000Z',
  },
  {
    id: '10',
    authorId: 'u10',
    authorName: 'Chloe Bergmann',
    authorAvatar: undefined,
    content:
      'Spent the morning pair programming with a junior dev. Taught them about abstractions, they taught me to stop over-engineering. Fair trade.',
    voteCount: 22,
    isPinned: false,
    createdAt: '2026-03-17T09:45:00.000Z',
  },
  {
    id: '11',
    authorId: 'u11',
    authorName: 'Rajan Pillai',
    authorAvatar: undefined,
    content:
      'The amount of time saved by a good README is inversely proportional to the amount of time anyone spends writing one.',
    voteCount: 18,
    isPinned: false,
    createdAt: '2026-03-16T15:00:00.000Z',
  },
  {
    id: '12',
    authorId: 'u12',
    authorName: 'Ingrid Lund',
    authorAvatar: undefined,
    content: 'Dark mode is not a preference. It is a lifestyle.',
    voteCount: 34,
    isPinned: false,
    createdAt: '2026-03-16T10:30:00.000Z',
  },
  {
    id: '13',
    authorId: 'u13',
    authorName: 'Felix Okafor',
    authorAvatar: undefined,
    content:
      'Nothing humbles you faster than revisiting code you wrote six months ago and having absolutely no memory of writing it.',
    voteCount: 29,
    isPinned: false,
    createdAt: '2026-03-15T18:10:00.000Z',
  },
  {
    id: '14',
    authorId: 'u14',
    authorName: 'Mei Lin',
    authorAvatar: undefined,
    content:
      "TypeScript generics are like glasses — uncomfortable at first, but once you get used to them you can't imagine coding without them.",
    voteCount: 25,
    isPinned: false,
    createdAt: '2026-03-15T11:00:00.000Z',
  },
  {
    id: '15',
    authorId: 'u15',
    authorName: 'Dmitri Volkov',
    authorAvatar: undefined,
    content:
      'Every codebase has that one file nobody touches. Everyone knows which file it is. Nobody talks about it.',
    voteCount: 41,
    isPinned: false,
    createdAt: '2026-03-14T14:55:00.000Z',
  },
  {
    id: '16',
    authorId: 'u16',
    authorName: 'Aisha Kamara',
    authorAvatar: undefined,
    content:
      'The best way to learn a new framework is to build something you actually want to use. Tutorial projects never stick.',
    voteCount: 17,
    isPinned: false,
    createdAt: '2026-03-14T08:30:00.000Z',
  },
  {
    id: '17',
    authorId: 'u17',
    authorName: 'Noah Fischer',
    authorAvatar: undefined,
    content:
      "Hot take: staging environments that don't mirror production are just expensive places to build false confidence.",
    voteCount: 13,
    isPinned: false,
    createdAt: '2026-03-13T17:20:00.000Z',
  },
  {
    id: '18',
    authorId: 'u18',
    authorName: 'Lucia Vargas',
    authorAvatar: undefined,
    content:
      "Accessibility is not a feature. It is a baseline. If your app doesn't work with a keyboard, it doesn't work.",
    voteCount: 38,
    isPinned: false,
    createdAt: '2026-03-13T12:00:00.000Z',
  },
  {
    id: '19',
    authorId: 'u19',
    authorName: 'Kwame Asante',
    authorAvatar: undefined,
    content:
      'I do not always write tests. But when I do, I write them after the bug that cost us two hours in prod.',
    voteCount: 20,
    isPinned: false,
    createdAt: '2026-03-12T16:40:00.000Z',
  },
  {
    id: '20',
    authorId: 'u20',
    authorName: 'Hana Suzuki',
    authorAvatar: undefined,
    content:
      'Shipped a zero-downtime migration today. The secret is boring infrastructure, good rollback plans, and not deploying on Fridays.',
    voteCount: 44,
    isPinned: false,
    createdAt: '2026-03-12T10:15:00.000Z',
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
