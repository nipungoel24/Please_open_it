import { defineConfig } from "vite";

// "./" keeps asset paths relative, so it works on Vercel and on any sub-path.
export default defineConfig({
  base: "./",
});
