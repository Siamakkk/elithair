import { Router, Request, Response, NextFunction } from "express"
import { UserService } from "./user.service"
import { validateBodyDto, validateParamsDto } from "../middleware/validator"
import { CreateUserDto, GetUserByIdDto } from "./user.dto"
import { ErrorMessages } from "../eums/errorMessages"

export const userRouter = Router()
const userService = new UserService()

userRouter.get('/:id', validateParamsDto(GetUserByIdDto), (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = userService.getUserById(Number(req.params.id))
  if(!user) {
    res.status(404).json(ErrorMessages.USER_NOT_FOUND)
    return
  }
  res.json(user)
  } catch (error) {
    next(error)
  }
})


userRouter.post('/', validateBodyDto(CreateUserDto), (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = userService.createUser(req.body)
    res.json(user)
  } catch (error: Error | any) {
    next(error)
  }
})