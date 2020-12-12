import { Controller, Get, Param, Render, UseGuards } from '@nestjs/common'
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard'
import { GuildAdminGuard } from '../auth/guards/guildAdmin.guard'
import { TournamentsService } from './tournaments.service'

@Controller('tournaments')
export class TournamentsController {
  constructor(
    private readonly service: TournamentsService
  ) {}

  @Get('new')
  @UseGuards(AuthenticatedGuard, GuildAdminGuard)
  @Render('pages/tournaments/new.hbs')
  newTournament() {
    return {}
  }

  @Get()
  @UseGuards(AuthenticatedGuard, GuildAdminGuard)
  @Render('pages/tournaments/list.hbs')
  async many() {
    const list = await this.service.getTournaments()

    return {
      list,
    }
  }

  @Get('/:id')
  @UseGuards(AuthenticatedGuard, GuildAdminGuard)
  @Render('pages/tournaments/details.hbs')
  one(@Param('id') id: string) {
    return this.service.getTournament(id)
  }
}
