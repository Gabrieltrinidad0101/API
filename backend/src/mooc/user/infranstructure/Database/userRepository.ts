import type IUserRepository from '../../domain/IUserRepository'
import { UserModel } from './userSchema'
import type IUser from '../../../../../../share/domain/user'
import { type IUpdateUser } from '../../domain/user'

export default class UserRepository implements IUserRepository {
  async insert (user: IUser): Promise<IUser | null> {
    const newUser = new UserModel(user)
    await newUser.save()
    const userSave: IUser = {
      name: newUser.name,
      password: newUser.password,
      _id: newUser._id as string,
      cellPhone: newUser.cellPhone,
      email: newUser.email
    }
    return userSave
  }

  async update (user: IUpdateUser): Promise<void> {
    await UserModel.updateOne({ _id: user._id }, {
      name: user.name,
      cellPhone: user.cellPhone,
      email: user.email
    })
  }

  async findByEmail (email: string): Promise<IUser | null> {
    const user = await UserModel.findOne<IUser>({ email })
    return user
  }

  async findById (_id: string, filter?: object): Promise<IUser | null> {
    const user = await UserModel.findById<IUser>(_id, filter)
    return user
  }
}
