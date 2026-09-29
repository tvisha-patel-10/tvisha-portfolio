// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import passwordProtect from './src/scripts/password-protect-plugin.js';

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx(),
    passwordProtect({
      universalPassword: 'peek-a-boo'
    })
  ]
});