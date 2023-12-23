import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import ogPlugin from "vite-plugin-open-graph"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ogPlugin({
      // your Open Graph information config
      basic: {
        title: "Vocab Miner",
        image: "https://vocabminer.com/og-image.png",
        url: "https://vocabminer.com",
        description:
          "Vocab Miner is a free tool to help you find new words from a text in Spanish.",
        locale: "en_US",
        siteName: "Vocab Miner",
      },
      twitter: {
        card: "summary_large_image",
        creator: "@jsjoeio",
        title: "Vocab Miner",
        description:
          "Vocab Miner is a free tool to help you find new words from a text in Spanish.",
        image: "https://vocabminer.com/og-image.png",
      },
    }),
  ],
})
