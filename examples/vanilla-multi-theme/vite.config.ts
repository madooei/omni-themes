import { defineConfig } from 'vite';
import type { Plugin } from 'vite';

// Vite plugin to inject theme script from theme store
function omniThemesPlugin(): Plugin {
  return {
    name: 'omni-themes-fouc-prevention',
    transformIndexHtml: {
      order: 'pre' as const,
      async handler(html: string) {
        try {
          // Dynamically import the theme store to get the script string
          const { applyThemeScriptString } = await import('./src/theme-store.ts');
          
          // Inject the theme script at the beginning of the head
          const themeScript = `<script>${applyThemeScriptString}</script>`;
          
          // Find the closing head tag and insert the script before it
          const headCloseIndex = html.indexOf('</head>');
          if (headCloseIndex !== -1) {
            return html.slice(0, headCloseIndex) + themeScript + html.slice(headCloseIndex);
          }
          
          // Fallback: if no head tag found, insert after opening html tag
          const htmlOpenIndex = html.indexOf('<html');
          if (htmlOpenIndex !== -1) {
            const htmlCloseIndex = html.indexOf('>', htmlOpenIndex) + 1;
            return html.slice(0, htmlCloseIndex) + themeScript + html.slice(htmlCloseIndex);
          }
          
          return html;
        } catch (error) {
          console.warn('Failed to inject theme script:', error);
          return html;
        }
      },
    },
  };
}

export default defineConfig({
  plugins: [omniThemesPlugin()],
}); 