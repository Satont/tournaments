import { Controller, Get, UseGuards } from '@nestjs/common'
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard'
import { GuildAdminGuard } from '../auth/guards/guildAdmin.guard'
import { RolesService } from './roles.service'

@Controller('')
export class RolesController {
  constructor(
    private readonly service: RolesService
  ) {}

  @Get('api/roles')
  @UseGuards(AuthenticatedGuard, GuildAdminGuard)
  roles() {
    return this.service.getRoles()
  }
}
