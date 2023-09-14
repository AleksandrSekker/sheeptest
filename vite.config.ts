import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

const repositoryName = 'sheeptest'; // Change this to your repository name
const base =
  process.env.NODE_ENV === 'production' ? `/${repositoryName}/` : '/';

export default defineConfig({
  plugins: [react()],
  base: base,
  test: {
    environment: 'happy-dom',
  },
});
