import { Injectable } from '@nestjs/common'
import { getRepository, In } from 'typeorm'
import { Player } from '../../entities/Player'
import { Team } from '../../entities/Team'
import { Tournament } from '../../entities/Tournament'
import { AuthService } from '../auth/discord-auth.service'
import { TeamDto } from './team.dto'

@Injectable()
export class TeamsService {
  private readonly repository = getRepository(Team)
  private readonly playersRepository = getRepository(Player)

  constructor(
    private readonly authService: AuthService
  ) {}

  async list(query: Record<string, string>) {
    const [list, total] = await this.repository.findAndCount({
      relations: ['players', 'captain', 'tournaments'],
      take: Number(query.itemsPerPage) || undefined,
      skip: (Number(query.page) - 1) * Number(query.itemsPerPage) || undefined,
    })

    const teams = await Promise.all(list.map(async (team) => ({
      ...team,
      captain: {
        ...team.captain,
        discord: await this.authService.findUserFromDiscordId(team.captain.userId),
      },
      players: await Promise.all(team.players.map(async (p) => ({
        ...p,
        discord: await this.authService.findUserFromDiscordId(p.userId),
      }))),
    })))

    return {
      teams,
      total,
    }
  }

  async team(id: string) {
    const item = await this.repository.findOne(id, {
      relations: ['players', 'captain', 'tournaments'],
    })

    return {
      ...item,
      players: await Promise.all(item.players.map(async (p) => ({
        ...p,
        discord: await this.authService.findUserFromDiscordId(p.userId),
      }))),
      captain: {
        ...item.captain,
        discord: await this.authService.findUserFromDiscordId(item.captain.userId),
      },
    }
  }

  async edit(id: string, body: TeamDto) {
    const team = await this.repository.findOne(id, { relations: ['captain', 'players'] })
    team.captain.id = body.captain
    team.players = await this.playersRepository.find({ id: In(body.players.map(p => p.value)) })
    team.name = body.name
    team.tournaments = await getRepository(Tournament).find({ id: In(body.tournaments.map(p => p.value)) })

    await team.save()
    return team
  }
}
