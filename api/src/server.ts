import App from './app';
import all from './routes'
import config from './config/config'

const app:App = new App(all, config.port)

app.listen()
