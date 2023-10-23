const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const data = {}
      on("task",{
        save(x){
          data["paypalLink"] = x
          return null
        },
        load(){
          return data["paypalLink"] || null
        }
      })
    },
  },
  env: {
    paypalLink: "" 
  },
  "chromeWebSecurity": false,
});
