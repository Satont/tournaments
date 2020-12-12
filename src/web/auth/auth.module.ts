import {
  HttpModule,
  Module,
} from '@nestjs/common'
import { AuthService } from './discord-auth.service'
import { DiscordStrategy } from './discord.strategy'
import { AuthController } from './auth.controller'
import { SessionSerializer } from './session.serializer'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [
    PassportModule.register({ session: true }),
    HttpModule,
  ],
  providers: [AuthService, DiscordStrategy, SessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
