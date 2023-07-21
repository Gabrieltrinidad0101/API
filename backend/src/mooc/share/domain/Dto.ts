export type Dto<T extends object, U extends keyof T> = Pick<T, U>
