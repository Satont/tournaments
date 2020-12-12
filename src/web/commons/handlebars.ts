import hbs from 'hbs'
import { resolve } from 'path'

hbs.registerPartials(resolve(process.cwd(), 'views', 'partials'))
hbs.registerPartial('title', 'Test')
hbs.registerHelper('debug', function(optionalValue) {
  console.log('Current Context')
  console.log('====================')
  console.log(this)
  if (optionalValue) {
    console.log('Value')
    console.log('====================')
    console.log(optionalValue)
  }
})
