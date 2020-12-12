import { Logger } from '@nestjs/common'
import Commando from 'discord.js-commando'
import { join } from 'path'

const logger = new Logger('Discord')

class DiscordClient extends Commando.CommandoClient {
  constructor() {
    super({
      owner: ['266632783336570880'],
      commandPrefix: '!',
      partials: ['GUILD_MEMBER'],
    })
  }

  loadRegistry() {
    this.registry.registerDefaultTypes()
    this.registry.registerGroups([
      ['general', 'Главные команды'],
      ['team', 'Всё, что относится к командам'],
    ])
    this.registry.registerDefaultGroups()
    this.registry.registerDefaultCommands()
    this.registry.registerCommandsIn(join(__dirname, 'commands'))
  }
}

const client = new DiscordClient()

client.on('ready', () => logger.log(`Logged as ${client.user.tag}.`))
client.on('error', (err) => logger.error(err))
client.on('commandError', (command, err) => logger.error(err))
client.on('commandRegister', (command) => logger.log(`Command ${command.name} registered.`))

export {
  client as DiscordClient,
}
