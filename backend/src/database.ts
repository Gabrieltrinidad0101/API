import mongosee from 'mongoose'

mongosee.connect(`mongodb://${process.env.HOST ?? 'localhost'}:27017/${process.env.DB ?? 'chatPlus'}`)
  .then(res => { console.log(`Db is connected ${process.env.DB ?? 'chatPlus'}`) })
  .catch(error => { console.error(error) })
