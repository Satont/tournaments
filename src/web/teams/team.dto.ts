import { IsArray, IsNumber, IsString } from 'class-validator'

export class TeamDto {
  @IsString()
  name: string

  @IsNumber()
  captain: number

  @IsArray()
  players: number[]

  @IsArray()
  tournaments: number[]
}
