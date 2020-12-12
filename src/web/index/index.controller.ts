import { Controller, Get, Render } from '@nestjs/common'
import { DiscordClient } from '../../bot'

@Controller()
export class IndexController {
  @Get()
  @Render('pages/index.hbs')
  root() {
    return {
      desciption: DiscordClient.user.tag,
    }
  }
}
