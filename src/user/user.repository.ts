import { ErrorMessages } from "../eums/errorMessages"
import { StandardError } from "../utils/standardError"
import { User } from "./user.dto"



export class UserRepository { 
  private users: User[] = []

  private findUserByEmail(email: string): User | null {
    return this.users.find(user => user.email === email) || null
  }

  
  public findUserById(userId: number): User | null {
    const user = this.users.find(user => user.id === userId)
    if(!user) {
      throw new StandardError(404, 'User not found')
    }
    return user
  }

  public createUser(user: User) {
    const isUserExist = this.findUserByEmail(user.email)
    if(isUserExist) {
      throw new StandardError(409, ErrorMessages.USER_ALREADY_EXIST)
    }
    user.id = this.users.length + 1
    if(!user.favoriteGenres) user.favoriteGenres = []
    this.users.push(user)
    return user
  }
}