import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// GitHub Pages 배포 경로: https://{사용자명}.github.io/my-portfolio/
export default defineConfig({
  base: '/my-portfolio/',
  plugins: [react()],
});
