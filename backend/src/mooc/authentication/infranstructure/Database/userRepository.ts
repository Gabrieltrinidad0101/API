import type IUserRepository from '../../domain/IUserRepository'
import { UserModel } from './userSchema'
import { ErrorInsertUser } from '../../domain/IErrorUser'
import type IUser from '../../../../../../share/domain/user'

export default class UserRepository implements IUserRepository {
  async insert (user: IUser): Promise<IUser | null> {
    try {
      const newUser = new UserModel(user)
      await newUser.save()
      const userSave: IUser = {
        name: newUser.name,
        password: newUser.password,
        _id: newUser._id as string
      }
      return userSave
    } catch (error) {
      console.log(error)
      throw new ErrorInsertUser()
    }
  }

  async findByName (name: string): Promise<IUser | null> {
    try {
      const user: IUser | null = await UserModel.findOne({ name })
      return user
    } catch (error) {
      console.log(error)
      throw new ErrorInsertUser()
    }
  }

  async findById (_id: string, filter?: object): Promise<IUser | null> {
    try {
      const user: IUser | null = await UserModel.findById(_id, filter)
      return user
    } catch (error) {
      console.log(error)
      throw new ErrorInsertUser()
    }
  }
}
