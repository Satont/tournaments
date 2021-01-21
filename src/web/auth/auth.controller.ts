import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Player } from '../../entities/Player'
import { AuthenticatedGuard } from './guards/authenticated.guard'
import { DiscordAuthGuard } from './guards/discord-auth.guard'

@Controller('auth')
export class AuthController {
  private readonly playersRepository = getRepository(Player)

  @Get('discord')
  @UseGuards(DiscordAuthGuard)
  async getUserFromDiscordLogin(@Res() res: Response, @Req() req: Request) {
    const user = await this.playersRepository.findOne({ userId: req.user.id })
    if (!user) {
      await this.playersRepository.create({ userId: req.user.id }).save()
    }

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
