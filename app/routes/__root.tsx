import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, HeadContent, Scripts } from '@tanstack/react-router';

import { SiteHeader } from '@/components/layout/site-header';
import { Toaster } from '@/components/ui/sonner';
import appCss from '@/styles/app.css?url';

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { title: 'DopamineTest — Is your brain still alive?' },
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'description',
        content:
          'Find out if your dopamine receptors are still functional. Based on Dopamine Nation by Anna Lembke.',
      },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
    scripts: [
      {
        children: `(function(){document.documentElement.classList.add('dark')})()`,
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" style={{ background: '#110e1a', colorScheme: 'dark' }}>
      <head>
        <HeadContent />
      </head>
      <body style={{ background: '#110e1a', color: '#f0edf5' }}>
        <SiteHeader />
        <main className="min-h-[calc(100vh-3.5rem)]">{children}</main>
        <Toaster position="top-right" richColors />
        <Scripts />
      </body>
    </html>
  );
}
