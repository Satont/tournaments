import { Controller, Get, UseGuards } from '@nestjs/common'
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard'
import { TeamsService } from './teams.service'

@Controller('')
export class TeamsController {
  constructor(
    private readonly service: TeamsService
  ) {}

  @Get('api/teams')
  @UseGuards(AuthenticatedGuard)
  list() {
    return this.service.list()
  }
}
