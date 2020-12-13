import { Controller, Get, UseGuards } from '@nestjs/common'
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard'
import { RolesService } from './roles.service'

@Controller('')
export class RolesController {
  constructor(
    private readonly service: RolesService
  ) {}

  @Get('api/roles')
  @UseGuards(AuthenticatedGuard)
  roles() {
    return this.service.getRoles()
  }
}
