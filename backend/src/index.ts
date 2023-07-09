import app from './app'
import { port } from './mooc/share/infranstructure/Constantes'

app.listen(port, () => {
  console.log('Server listening on port 4000')
})
