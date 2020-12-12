import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { AuthService } from '../auth/discord-auth.service'
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard'
import { PlayersService } from './players.service'

@Controller('api/players')
export class PlayersController {
  constructor(
    private readonly service: PlayersService,
    private readonly authService: AuthService
  ) {}

  @Get()
  @UseGuards(AuthenticatedGuard)
  players() {
    return this.service.getList()
  }

  @Get('/:id')
  @UseGuards(AuthenticatedGuard)
  player(@Param('id') id: string) {
    return this.service.getOne(id)
  }
}
