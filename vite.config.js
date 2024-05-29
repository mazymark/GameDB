import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler"]],
        },
      })
    ),
    eslint(),
  ],
});
