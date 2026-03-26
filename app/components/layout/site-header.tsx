import { Link } from '@tanstack/react-router';
import { Activity } from 'lucide-react';

export function SiteHeader() {
  return (
    <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition-opacity">
          <Activity className="size-5 text-primary" />
          <span>DopamineTest</span>
        </Link>
      </div>
    </header>
  );
}
