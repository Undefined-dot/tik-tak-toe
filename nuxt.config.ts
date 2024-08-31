// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/google-fonts'],

  googleFonts: {
    families: {
      Poppins: [400, 700], // Exemple pour Roboto avec les poids 400 et 700
    },
    display: 'swap', // Option pour améliorer les performances
    
    //useStylesheet: true
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
})