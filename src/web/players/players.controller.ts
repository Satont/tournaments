import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common'
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard'
import { GuildAdminGuard } from '../auth/guards/guildAdmin.guard'
import { PlayerDto } from './player.dto'
import { PlayersService } from './players.service'

@Controller('api/players')
export class PlayersController {
  constructor(
    private readonly service: PlayersService,
  ) {}

  @Get()
  @UseGuards(AuthenticatedGuard, GuildAdminGuard)
  players(@Query() query: Record<string, string>) {
    return this.service.getList(query)
  }

  @Get(':id')
  @UseGuards(AuthenticatedGuard, GuildAdminGuard)
  player(@Param('id') id: string) {
    return this.service.getOne(id)
  }

  @Post(':id')
  @UseGuards(AuthenticatedGuard, GuildAdminGuard)
  editPlayer(@Param('id') id: string, @Body() body: PlayerDto) {
    return this.service.edit(id, body)
  }
}
