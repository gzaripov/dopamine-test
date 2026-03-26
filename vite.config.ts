import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    viteTsConfigPaths({ projects: ['./tsconfig.json'] }),
    tailwindcss(),
    tanstackStart({
      srcDirectory: '.',
      router: {
        entry: 'app/router.tsx',
        generatedRouteTree: 'app/routeTree.gen.ts',
        routesDirectory: 'app/routes',
        tmpDir: 'node_modules/.tmp/tanstack',
      },
      server: {
        entry: 'app/server.ts',
      },
      start: {
        entry: 'app/start.ts',
      },
    }),
    viteReact(),
  ],
});
