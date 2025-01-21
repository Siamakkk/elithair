import { StandardError } from "../utils/standardError"
import { User } from "./user.dto"
import { UserRepository } from "./user.repository"


export class UserService {
  private userRepository: UserRepository
  constructor() {
    this.userRepository = new UserRepository()
  }
  getUserById(userId: number) {
    try {
      return this.userRepository.findUserById(userId)
    } catch (error) {
      console.error('error in UserService.getUserById', error)
      throw error
    }
  }

  createUser(user: User) {
    try {
      return this.userRepository.createUser(user)  
    } catch (error) {
      console.error('error in UserService.createUser', error)
      throw error
    }
    
  }
}