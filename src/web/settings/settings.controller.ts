import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard'
import { SettingsDto } from './settings.dto'
import { SettingsService } from './settings.service'

@Controller()
export class SettingsController {
  constructor(
    private readonly service: SettingsService
  ) {}

  @Get('api/settings')
  @UseGuards(AuthenticatedGuard)
  settingsList() {
    return this.service.getSettingsList()
  }

  @Post('api/settings')
  @UseGuards(AuthenticatedGuard)
  postSettings(@Body() body: SettingsDto) {
    return body
  }
}
