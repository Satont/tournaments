import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common'
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard'
import { GuildAdminGuard } from '../auth/guards/guildAdmin.guard'
import { TeamsService } from './teams.service'

@Controller('')
export class TeamsController {
  constructor(
    private readonly service: TeamsService
  ) {}

  @Get('api/teams')
  @UseGuards(AuthenticatedGuard, GuildAdminGuard)
  list(@Query() query: Record<string, string>) {
    return this.service.list(query)
  }

  @Get('api/teams/:id')
  @UseGuards(AuthenticatedGuard, GuildAdminGuard)
  team(@Param() id: string) {
    return this.service.team(id)
  }
}
