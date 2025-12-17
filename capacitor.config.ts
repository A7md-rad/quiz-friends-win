import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.80cf9c171d484a0a8c1e93f1a83b654e',
  appName: 'لعب وتعلّم',
  webDir: 'dist',
  server: {
    url: 'https://80cf9c17-1d48-4a0a-8c1e-93f1a83b654e.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    backgroundColor: '#e8f4f3'
  },
  plugins: {
    StatusBar: {
      style: 'LIGHT',
      backgroundColor: '#e8f4f3'
    }
  }
};

export default config;
