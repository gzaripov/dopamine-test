import { createMiddleware } from '@tanstack/react-start';
import { getRequest } from '@tanstack/react-start/server';

import { auth } from '@/lib/auth';

export const optionalAuthMiddleware = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {
    const req = getRequest();
    const session = await auth.api.getSession({ headers: req.headers });
    return next({ context: { user: session?.user ?? null } });
  },
);

export const requireAuthMiddleware = createMiddleware({ type: 'function' })
  .middleware([optionalAuthMiddleware])
  .server(async ({ next, context }) => {
    if (!context.user) {
      throw new Error('Unauthorized');
    }
    return next({
      context: context as typeof context & { user: NonNullable<typeof context.user> },
    });
  });
