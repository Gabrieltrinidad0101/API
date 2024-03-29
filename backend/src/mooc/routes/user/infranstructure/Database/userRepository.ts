import type IUserRepository from '../../domain/IUserRepository'
import { UserModel } from './userSchema'
import type IUser from '../../../../../../../share/domain/user'
import { type IUserRegister, type IUserUpdate } from '../../../../../../../share/domain/user'

export default class UserRepository implements IUserRepository {
  async insert (user: IUserRegister): Promise<IUser | null> {
    const newUser = new UserModel({ ...user })
    await newUser.save()
    const userSave: IUser = {
      name: newUser.name,
      password: newUser.password,
      _id: newUser._id as string,
      cellPhone: newUser.cellPhone,
      email: newUser.email,
      rol: newUser.rol
    }
    return userSave
  }

  async update (user: IUserUpdate): Promise<void> {
    await UserModel.updateOne({ _id: user._id }, {
      name: user.name,
      cellPhone: user.cellPhone,
      email: user.email
    })
  }

  async existUserByEmailAndId (email: string, _id: string): Promise<IUser | null> {
    const user = await UserModel.findOne<IUser>({ email, _id: { $ne: _id } })
    return user
  }

  async findById (_id: string, filter?: object): Promise<IUser | null> {
    const user = await UserModel.findById<IUser>(_id, filter)
    return user
  }

  find = async (search: object, filter?: object): Promise<IUser[] | null> => {
    return await UserModel.find<IUser>(search, filter)
  }

  findOne = async (search: object, filter?: object): Promise<IUser | null> => {
    return await UserModel.findOne<IUser>(search, filter)
  }

  updatePassword = async (filter: object, newPassword: string): Promise<void> => {
    await UserModel.updateOne({ filter }, { password: newPassword })
  }
}
