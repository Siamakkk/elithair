import { Transform } from 'class-transformer';
import { IsEmail, IsString, IsArray, IsOptional, IsInt, Min } from 'class-validator';

export class CreateUserDto {
  @IsInt()
  @IsOptional()
  id?: number

  @IsString()
  name?: string

  @IsEmail()
  email?: string

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  favoriteGenres?: string[]
}

export class GetUserByIdDto {
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @IsInt()
  id?: number
}


export interface User {
  id?: number
  name: string
  email: string
  favoriteGenres?: string[]
}