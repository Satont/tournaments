import { Type } from 'class-transformer'
import { IsArray, IsString } from 'class-validator'

export class PlayerDto {
  @IsString()
  tag: string

  @IsString()
  activision: string

  @IsArray()
  @Type(() => String)
  roles: string[]

  @IsArray()
  @Type(() => Number)
  teams: number[]
}
