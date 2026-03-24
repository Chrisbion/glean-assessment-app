import { type z } from 'zod';
import type { postSchema, postListSchema } from './schemas';

export type Post = z.infer<typeof postSchema>;
export type PostList = z.infer<typeof postListSchema>;
