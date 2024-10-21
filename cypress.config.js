require('dotenv').config({ path: './.env' }); 
const { defineConfig } = require("cypress");


module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || 'http://localhost:8080/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    apiUrl: process.env.CYPRESS_API,
    originUrl: 'https://ylana-ong.com'
  }
});
