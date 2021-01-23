import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common'
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard'
import { GuildAdminGuard } from '../auth/guards/guildAdmin.guard'
import { TeamDto } from './team.dto'
import { TeamsService } from './teams.service'

@Controller('api/teams')
export class TeamsController {
  constructor(
    private readonly service: TeamsService
  ) {}

  @Get()
  @UseGuards(AuthenticatedGuard, GuildAdminGuard)
  list(@Query() query: Record<string, string>) {
    return this.service.list(query)
  }

  @Get(':id')
  @UseGuards(AuthenticatedGuard, GuildAdminGuard)
  team(@Param() id: string) {
    return this.service.team(id)
  }

  @Post(':id')
  @UseGuards(AuthenticatedGuard, GuildAdminGuard)
  editTeam(@Param('id') id: string, @Body() body: TeamDto) {
    return this.service.edit(id, body)
  }
}
