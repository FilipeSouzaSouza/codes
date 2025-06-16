import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/Component.svelte',
  output: {
    file: 'lib/Component.svelte',
    format: 'esm'
  },
  plugins: [
    svelte(),
    resolve()
  ]
};