import './conf'
import './mooc/share/infranstructure/sendEmail/pdf/invoice'

import app from './app'
import constantes from './mooc/share/infranstructure/Constantes'

app.listen(constantes.PORT, () => {
  console.log(`Server listening on port ${constantes.PORT ?? 'Error'}`)
})
