import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard'
import { GuildAdminGuard } from '../auth/guards/guildAdmin.guard'
import { TournamentsService } from './tournaments.service'

@Controller()
export class TournamentsController {
  constructor(
    private readonly service: TournamentsService
  ) {}

  @Get('api/tournaments')
  @UseGuards(AuthenticatedGuard, GuildAdminGuard)
  async many() {
    const list = await this.service.getTournaments()

    return {
      list,
    }
  }

  @Get('api/tournaments/:id')
  @UseGuards(AuthenticatedGuard, GuildAdminGuard)
  one(@Param('id') id: string) {
    return this.service.getTournament(id)
  }
}
