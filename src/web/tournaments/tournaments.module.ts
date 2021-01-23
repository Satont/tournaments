import { Module } from '@nestjs/common'
import { AuthService } from '../auth/discord-auth.service'
import { TournamentsController } from './tournaments.controller'
import { TournamentsService } from './tournaments.service'

@Module({
  controllers: [TournamentsController],
  providers: [TournamentsService, AuthService],
})
export class TournamentsModule {}
