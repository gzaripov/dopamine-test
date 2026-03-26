import handler, { createServerEntry } from '@tanstack/react-start/server-entry';

import { auth } from './lib/auth';

export default createServerEntry({
  fetch: async (req) => {
    const url = new URL(req.url);
    if (url.pathname.startsWith('/api/auth')) {
      return auth.handler(req);
    }
    return handler.fetch(req);
  },
});
