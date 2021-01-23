import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard'
import { GuildAdminGuard } from '../auth/guards/guildAdmin.guard'
import { SettingsDto } from './settings.dto'
import { SettingsService } from './settings.service'

@Controller()
export class SettingsController {
  constructor(
    private readonly service: SettingsService
  ) {}

  @Get('api/settings')
  @UseGuards(AuthenticatedGuard, GuildAdminGuard)
  list() {
    return this.service.list()
  }

  @Post('api/settings')
  @UseGuards(AuthenticatedGuard, GuildAdminGuard)
  edit(@Body() body: SettingsDto) {
    return this.service.edit(body)
  }
}
