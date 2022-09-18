import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import nodePolyfills from "rollup-plugin-polyfill-node";
//import * as util from "util";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills({
    include: ["assert"]
  })],
  base: "./",
  define: {
    process: {
      env: {}
    }
  }
})
