import mongosee from 'mongoose'

mongosee.connect(`mongodb://${process.env.HOST ?? '127.0.0.1'}:27017/${process.env.DB ?? 'chatPlus'}`)
  .then(res => { console.log(`Db is connected ${process.env.DB ?? 'chatPlus'}`) })
  .catch(error => { console.error(error) })
