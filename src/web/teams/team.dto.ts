import { IsArray, IsNumber, IsString } from 'class-validator'

export class TeamDto {
  @IsString()
  name: string

  @IsNumber()
  captain: number

  @IsArray()
  players: { text: string, value: number }[]

  @IsArray()
  tournaments: number[]
}
