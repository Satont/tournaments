import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { IndexController } from './index/index.controller'
import { TournamentsModule } from './tournaments/tournaments.module'
import { PlayersModule } from './players/players.module'
import { RolesModule } from './roles/roles.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [AuthModule, TournamentsModule, PlayersModule, RolesModule, SettingsModule],
  controllers: [IndexController],
  providers: [],
})
export class AppModule {}
