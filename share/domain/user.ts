export type TypeRol = "admin" | "user" 
export type TypeAuthentication = "Login" | "Register" 

export default interface IUser{
    name: string
    password: string
    cellPhone: string
    email: string
    repeatedPassword?: string
    rol: TypeRol
    typeAuthentication?: TypeAuthentication
    _id?: string
}

export interface IUserRegister{
    name: string
    password: string
    cellPhone: string
    email: string
    rol: TypeRol
}

export interface IUserLogin{
    password: string
    email: string
}

export interface IUserUpdate{
    name: string
    cellPhone: string
    email: string
    _id: string
}