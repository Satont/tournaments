import { IsNumber, IsString } from 'class-validator'

export class CommentDto {
  @IsString()
  text: string

  @IsNumber()
  tournamentId: number
}
