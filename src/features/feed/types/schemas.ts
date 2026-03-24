import { z } from 'zod';

export const postSchema = z.object({
  id: z.string(),
  authorId: z.string(),
  authorName: z.string(),
  authorAvatar: z.string().optional(),
  content: z.string(),
  voteCount: z.number().int(),
  isPinned: z.boolean(),
  createdAt: z.string().datetime(),
});

export const postListSchema = z.array(postSchema);
