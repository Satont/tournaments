import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard'
import { TeamsService } from './teams.service'

@Controller('')
export class TeamsController {
  constructor(
    private readonly service: TeamsService
  ) {}

  @Get('api/teams')
  @UseGuards(AuthenticatedGuard)
  list(@Query() query: Record<string, string>) {
    return this.service.list(query)
  }
}
