import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { AuthenticatedGuard } from './guards/authenticated.guard'
import { DiscordAuthGuard } from './guards/discord-auth.guard'

@Controller('auth')
export class AuthController {
  @Get('discord')
  @UseGuards(DiscordAuthGuard)
  async getUserFromDiscordLogin(@Res() res: Response) {
    res.redirect('/')
  }

  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    (req as any).logout()

    res.redirect('/')
  }

  @Get('me')
  @UseGuards(AuthenticatedGuard)
  me(@Req() req: Request) {
    return req.user
  }
}
