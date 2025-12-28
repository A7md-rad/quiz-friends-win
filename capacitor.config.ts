import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.80cf9c171d484a0a8c1e93f1a83b654e',
  appName: 'العب و تعلم',
  webDir: 'dist',
  android: {
    backgroundColor: '#e8f4f3'
  },
  plugins: {
    StatusBar: {
      style: 'LIGHT',
      backgroundColor: '#e8f4f3'
    },
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#e8f4f3',
      showSpinner: false
    }
  }
};

export default config;
