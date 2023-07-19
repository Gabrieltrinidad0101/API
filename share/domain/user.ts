export type TypeRol = "admin" | "user" 
export type TypeAuthentication = "Login" | "Register" 

export default interface IUser{
    name: string
    password: string
    cellPhone: string
    email: string
    rol: TypeRol
    typeAuthentication?: TypeAuthentication
    _id?: string
}