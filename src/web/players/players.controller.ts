import { Controller, Get, UseGuards } from '@nestjs/common'
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard'
import { PlayersService } from './players.service'

@Controller('api/players')
export class PlayersController {
  constructor(
    private readonly service: PlayersService
  ) {}

  @Get()
  @UseGuards(AuthenticatedGuard)
  players() {
    return this.service.getList()
  }
}
