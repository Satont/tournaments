import { IsString } from 'class-validator'

export class TournamentCreateDto {
  @IsString()
  name: string

  @IsString()
  type: string

  @IsString()
  channel: string
}
