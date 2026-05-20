import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		paraglideVitePlugin({ project: './project.inlang', outdir: './src/lib/paraglide' })
	],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use "sass:math";@use "/src/styles/variables.scss" as *;'
			}
		}
	}
});
