import { Module } from '@nestjs/common'
import { AuthService } from '../auth/discord-auth.service'
import { PlayersController } from './players.controller'
import { PlayersService } from './players.service'

@Module({
  controllers: [PlayersController],
  providers: [PlayersService, AuthService],
})
export class PlayersModule {}
