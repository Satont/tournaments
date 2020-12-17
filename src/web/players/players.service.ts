import { Injectable } from '@nestjs/common'
import { getRepository } from 'typeorm'
import { DiscordClient } from '../../bot'
import { Player } from '../../entities/Player'
import { Settings } from '../../entities/Settings'
import { Team } from '../../entities/Team'
import { AuthService } from '../auth/discord-auth.service'
import { PlayerDto } from './player.dto'

@Injectable()
export class PlayersService {
  private readonly repository = getRepository(Player)
  private readonly teamRepository = getRepository(Team)
  private readonly settingsRepository = getRepository(Settings)

  constructor(
    private readonly authService: AuthService
  ) {}

  async getList(query: Record<string, string>) {
    const [list, total] = await this.repository.findAndCount({
      relations: ['teams', 'teams.tournaments'],
      take: Number(query.itemsPerPage),
      skip: (Number(query.page) - 1) * Number(query.itemsPerPage),
    })

    const players = await Promise.all(list.map(async (player) => ({
      ...player,
      discord: await this.authService.findUserFromDiscordId(player.userId),
    })))

    return {
      players,
      total,
    }
  }

  async getOne(id: string) {
    const player = await this.repository.findOne(id, { relations: ['teams', 'teams.players'] })
    return {
      ...player,
      discord: await this.authService.findUserFromDiscordId(player.userId),
    }
  }

  async edit(id: string, body: PlayerDto) {
    const player = await this.repository.findOne(id, { relations: ['teams', 'teams.players'] })
    const settingsRoles = await this.settingsRepository.findOne({ space: 'general', name: 'roles' })

    const guild = DiscordClient.guilds.cache.first()
    const [oldDiscord, newDiscord] = await Promise.all([
      guild.members.fetch(player.userId),
      guild.members.cache.find(member => member.user.tag === body.tag),
    ])
    const discord = oldDiscord || newDiscord

    for (const team of player.teams.filter(team => !body.teams.includes(team.id))) {
      player.teams = player.teams.filter(t => t !== team)
    }

    for (const team of body.teams.filter(team => !player.teams.some(t => team === t.id))) {
      player.teams.push(await this.teamRepository.findOne(team))
    }

    for (const role of settingsRoles.value as { id: string, kda: number }[]) {
      if (body.roles.includes(role.id) && discord.roles.cache.has(role.id)) continue
      else if (!body.roles.includes(role.id) && discord.roles.cache.has(role.id)) {
        discord.roles.remove(role.id)
      } else if (body.roles.includes(role.id) && !discord.roles.cache.has(role.id)) {
        discord.roles.add(role.id)
      } else continue
    }

    player.userId = discord.id
    player.activision = body.activision

    await player.save()
    return player
  }
}
