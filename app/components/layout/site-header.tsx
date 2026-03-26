import { Link } from '@tanstack/react-router';
import { Activity, LogOut, History } from 'lucide-react';

import { signOut, useSession } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';

export function SiteHeader() {
  const { data: session } = useSession();

  return (
    <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition-opacity">
          <Activity className="size-5 text-primary" />
          <span>DopamineTest</span>
        </Link>

        <nav className="flex items-center gap-2">
          {session?.user ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/history">
                  <History className="size-4" />
                  History
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut()}
              >
                <LogOut className="size-4" />
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/auth/login">Sign in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/auth/signup">Sign up</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
