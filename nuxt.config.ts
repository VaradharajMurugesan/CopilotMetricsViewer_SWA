// https://nuxt.com/docs/api/configuration/nuxt-config
import { readFileSync } from 'fs';
const packageJson = readFileSync('package.json', 'utf8');
const version = JSON.parse(packageJson).version;

export default defineNuxtConfig({
  // Disable full SSR for SWA deployment (SPA mode)
  ssr: true, 
  // target: 'static', // pre-render pages at build time (optional)

  // Head and global styles
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }]
    }
  },
  css: ['@/assets/global.css'],

  // Devtools and experimental features
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  features: { inlineStyles: false, devLogs: false },

  // Build configuration
  build: { transpile: ['vuetify'] },
  vite: { ssr: { noExternal: ['vuetify'] } },

  // Modules
  modules: ['@nuxt/fonts', 'vuetify-nuxt-module', '@nuxt/eslint', 'nuxt-auth-utils'],

  // Vuetify configuration
  vuetify: {
    moduleOptions: {
      ssrClientHints: {
        reloadOnFirstRequest: false,
        viewportSize: true,
        prefersColorScheme: false,
        prefersColorSchemeOptions: { useBrowserThemeOnly: false },
      },
      styles: { configFile: 'assets/settings.scss' },
    },
  },

  // Auth configuration (GitHub OAuth)
  auth: {
    github: {
      enabled: true,
      clientId: '', // set via runtime config or env
      clientSecret: '' // set via runtime config or env
    }
  },

  // Nitro configuration for SWA
  nitro: {
    preset: 'azure', // critical for SWA
    plugins: ['plugins/http-agent'],
  },

  // Runtime configuration
  runtimeConfig: {
    githubToken: '',
    session: {
      maxAge: 60 * 60 * 6,
      password: '',
    },
    oauth: {
      github: {
        clientId: '',
        clientSecret: ''
      }
    },
    public: {
      isDataMocked: false,  
      scope: 'organization',
      githubOrg: '',
      githubEnt: '',
      githubTeam: '',
      usingGithubAuth: false,
      version,
      isPublicApp: false
    }
  }
});
