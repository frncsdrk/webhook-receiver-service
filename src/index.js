const config = require('config'),
  express = require('express'),
  bodyParser = require('body-parser')

const routes = {
  trigger: require('./routes/trigger.js')
}

const app = express()
const serverConfig = config.get('service.server')

app.use(bodyParser.json())
app.use(bodyParser.text({ limit: '50mb', type: 'text/*' }))
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/trigger', routes.trigger)

const server = app.listen(serverConfig.port, () => {
  console.log('server listening at %s', server.address().hostserver, server.address().port)
})
