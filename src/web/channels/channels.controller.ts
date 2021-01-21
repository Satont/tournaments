import { Controller, Get, UseGuards } from '@nestjs/common'
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard'
import { GuildAdminGuard } from '../auth/guards/guildAdmin.guard'
import { ChannelsService } from './channels.service'

@Controller('api/channels')
export class ChannelsController {

  constructor (private readonly service: ChannelsService) {}

  @Get()
  @UseGuards(AuthenticatedGuard, GuildAdminGuard)
  getChannels() {
    return this.service.getChannels()
  }
}
