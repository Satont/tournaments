import { Controller, Get } from '@nestjs/common'

@Controller()
export class IndexController {
  @Get()
  root() {
    return {}
  }
}
