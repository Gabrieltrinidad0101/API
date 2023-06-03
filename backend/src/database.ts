import mongosee from 'mongoose'

mongosee.connect(`mongodb://${process.env.HOST ?? 'localhost'}:27017/chatPlus`)
  .then(res => { console.log('Db is connected') })
  .catch(error => { console.error(error) })
