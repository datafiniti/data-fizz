const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })

nightmare
  .goto('https://www.amazon.com/')
  .mouseover('#nav-link-shopall')
  .wait('.nav-text')
  .mouseover('span[aria-label="Books & Audible"]')
  .end()
  .catch(error => {
    console.error('Search failed:', error)
  })
