export class ErrorUser extends Error {
}

export class ErrorInsertUser extends ErrorUser {
  constructor () {
    super('Error saving the user')
  }
}
