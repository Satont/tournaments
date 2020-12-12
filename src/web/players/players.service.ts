import { Injectable } from '@nestjs/common'
import { getRepository } from 'typeorm'
import { Player } from '../../entities/Player'
import { AuthService } from '../auth/discord-auth.service'

@Injectable()
export class PlayersService {
  private readonly repository = getRepository(Player)

  constructor(
    private readonly authService: AuthService
  ) {}

  async getList() {
    const list = await this.repository.find({
      relations: ['teams', 'teams.tournaments'],
    })

    return await Promise.all(list.map(async (player) => ({
      ...player,
      discord: await this.authService.findUserFromDiscordId(player.userId),
    })))
  }
}
