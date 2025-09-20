import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(
      // colors: {
      //   primary: "#80011f",   // Dark Red
      //   secondary: "#ffefcc", // Light Cream
      //   accent: "#ffdf9e",    // Light Yellow
      // },
    ),
  ],
})
