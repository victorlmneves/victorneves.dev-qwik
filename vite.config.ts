import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { fileURLToPath, URL } from 'url'

export default defineConfig(() => {
  return {
    optimizeDeps: {
      include: ['@auth/core'],
    },
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: ``
        }
      },
    },
    resolve: {
      alias: {
        '/@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: 3000,
      host: true,
    },
  };
});
