import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'
import { getRepository } from 'typeorm'
import { Player } from '../../entities/Player'
import { Tournament } from '../../entities/Tournament'
import { TournamentComment } from '../../entities/TournamentComment'
import { AuthService } from '../auth/discord-auth.service'
import { CommentDto } from './comment.dto'
import { TournamentCreateDto } from './tournament.create.dto'

@Injectable()
export class TournamentsService {
  private readonly repository = getRepository(Tournament)
  private readonly commentsRepository = getRepository(TournamentComment)
  private readonly playerRepository = getRepository(Player)

  /* getTournaments() {
    return this.repository.createQueryBuilder('t')
      .loadRelationCountAndMap('t.teams', 't.teams')
      .loadRelationCountAndMap('t.players', 't.teams.players')
      .getMany()
  } */

  constructor(private readonly authService: AuthService) {}

  getTournaments() {
    return this.repository.find({
      relations: ['teams', 'teams.team', 'teams.team.players'],
    })
  }

  getTournament(id: string) {
    return this.repository.findOne({
      where: {
        id,
      },
      relations: ['teams', 'teams.team', 'teams.team.players'],
    })
  }

  async getComments(id: string) {
    const comments = await this.commentsRepository.find({
      where: {
        tournament: id,
      },
      relations: ['author'],
    })
    

    return await Promise.all(comments.map(async (comment) => ({
      ...comment,
      author: await this.authService.findUserFromDiscordId(comment.author.userId),
    })))
  }

  createTournament(opts: TournamentCreateDto) {
    return this.repository.create({ type: opts.type, name: opts.name, isRunned: true, channel: opts.channel }).save()
  }

  async createComment(body: CommentDto, user: Request['user']) {
    const author = await this.playerRepository.findOne({ userId: user.id })
    if (!author) throw new UnauthorizedException('User not found')
    const comment = await this.commentsRepository.create({ 
      author, 
      tournament: { id: body.tournamentId },
      text: body.text,
    }).save()

    return {
      ...comment,
      author: await this.authService.findUserFromDiscordId(comment.author.userId),
    }
  }

  deleteComment(commentId: string) {
    return this.commentsRepository.delete(commentId)
  }
}
