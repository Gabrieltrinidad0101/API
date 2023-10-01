import mongoose from 'mongoose'

export default class DataBase {
  isValidObjectId (objectOrId: string | object): boolean {
    if (typeof objectOrId === 'object') {
      const hasId = Object.keys(objectOrId).includes('_id')
      if (!hasId) return true
      const { _id } = (objectOrId as any)
      return mongoose.Types.ObjectId.isValid(_id)
    }

    return mongoose.Types.ObjectId.isValid(objectOrId)
  }
}
