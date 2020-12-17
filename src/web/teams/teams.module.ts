import { Module } from '@nestjs/common'
import { TeamsService } from './teams.service'
import { TeamsController } from './teams.controller'
import { AuthService } from '../auth/discord-auth.service'

@Module({
  providers: [TeamsService, AuthService],
  controllers: [TeamsController],
})
export class TeamsModule {}
