import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Cómo codificar en TS',
  description: 'TDD con Vue 3.',
  base: '/how-to-code-in-typescript/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Comenzar', link: '/comenzar/tdd' },
      { text: 'CaribesTIC', link: 'https://caribestic.github.io/' },      
    ],
    sidebar: [{      
      path: '/',      // optional, link of the title, which should be an absolute path and must exist        
      sidebarDepth: 1,    // optional, defaults to 1
      items: [
        { text: 'Introducción', link: '/intro' },
        { text: 'Cómo Usar Tipos Básicos', link: '/how-to-use-basic-types' },                            
      ]
    }],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/CaribesTIC/vue-tdd' }
    ]
  }
})



