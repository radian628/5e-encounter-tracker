import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import nodePolyfills from "rollup-plugin-polyfill-node";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
//import * as util from "util";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills({
    include: ["assert", "process"]
  })],
  build: {
    rollupOptions: {
      plugins: [
        nodePolyfills({
          include: ["assert", "process"]
        })
      ]
    }
  },
  base: "./",
  define: {
    global: '({})',
    // process: {
    //   env: {},
    //   stdout: {
    //     write: console.log
    //   }
    // }
  },
  resolve: {
    alias: {
      process: "rollup-plugin-polyfill-node"
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis"
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true
        }),
        NodeModulesPolyfillPlugin()
      ]
    }
  },
})
