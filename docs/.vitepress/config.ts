import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Cómo codificar en TS',
  description: 'TDD con Vue 3.',
  base: '/how-to-code-in-typescript/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/me.jpg',
    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Comenzar', link: '/intro' },
      { text: 'ecanquiz', link: 'https://ecanquiz.github.io/' },      
    ],
    sidebar: [{      
      path: '/',      // optional, link of the title, which should be an absolute path and must exist        
      sidebarDepth: 1,    // optional, defaults to 1
      items: [
        { text: 'Introducción', link: '/intro' },
        { text: 'Cómo Usar Tipos Básicos', link: '/how-to-use-basic-types' },
        { text: 'Cómo Crear Tipos Personalizados', link: '/how-to-create-custom-types' },
        { text: 'Cómo Usar Funciones', link: '/how-to-use-functions' },
        { text: 'Cómo Usar Enumeraciones', link: '/how-to-use-enums' },     
        { text: 'Cómo Usar Clases', link: '/how-to-use-classes' },
        { text: 'Cómo Usar Decoradores', link: '/how-to-use-decorators' },
      ]
    }],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ecanquiz/how-to-code-in-typescript' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present Ernesto Canquiz'
    } 
  }
})



