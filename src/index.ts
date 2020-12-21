import dotenv from 'dotenv'
dotenv.config()
import 'source-map-support/register'
import 'reflect-metadata'

import { DiscordClient } from './bot'
import { bootstrap as bootstrapWeb } from './web'
import { bootstrap as CODBootstrap } from './libs/cod'
import { createConnection, getConnection } from 'typeorm'
import { Team } from './entities/Team'
import { Player } from './entities/Player'
import { Tournament } from './entities/Tournament'
import { TeamToTournament } from './entities/TeamToTournament'
import { connect } from 'http2'


async function bootstrap() {
  await createConnection()
  if (!getConnection().isConnected) {
    return setTimeout(() => bootstrap(), 1000)
  }

  await DiscordClient.login(process.env.DISCORD_BOT_TOKEN)
  DiscordClient.loadRegistry()
  await bootstrapWeb()
  await CODBootstrap()
}

bootstrap()

process.on('unhandledRejection', (reason) => console.error(reason))
