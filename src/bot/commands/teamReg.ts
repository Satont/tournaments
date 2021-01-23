import { Command, CommandoMessage, CommandoClient } from 'discord.js-commando'
import { Player } from '../../entities/Player'
import { Team } from '../../entities/Team'
import { getRepository } from 'typeorm'

interface IHelperOptions {
  msg: CommandoMessage,
  teamName: string,
  player: Player
}

export default class extends Command {
  readonly playerRepository = getRepository(Player)
  readonly teamRepository = getRepository(Team)

  constructor(client: CommandoClient) {
    super(client, {
      name: 'regt',
      group: 'team',
      memberName: 'regt',
      description: 'Регистрация команды.',
      args: [
        {
          key: 'teamName',
          prompt: 'Введите имя команды',
          type: 'string',
        },
      ],
    })
  }

  async run(msg: CommandoMessage, { teamName }) {
    const player = await this.playerRepository.findOne({ userId: msg.author.id })
    if (!player) return msg.reply('похоже, вы ещё не зарегистрировались. Используйте !reg.')

    const functionName = msg.mentions.members.size ? 'withPlayers' : 'withOutPlayers'
    return this[functionName]({ msg, teamName, player })
  }

  async withOutPlayers(opts: IHelperOptions) {
    const team = this.teamRepository.create({
      captain: opts.player,
      name: opts.teamName,
      players: [opts.player],
    })
    await this.teamRepository.save(team)

    return opts.msg.reply(`вы успешно зарегестрировали команду ${team.name}`)
  }

  async withPlayers(opts: IHelperOptions) {
    const mentions = opts.msg.mentions.members?.filter(m => m.id !== opts.msg.author.id)
    if (!mentions.size) return opts.msg.reply(`выберете тимейтов для регистрации в команду.`)

    const targets: Player[] = []

    for (const [userId] of mentions) {
      const user = await this.playerRepository.findOne({ userId })
      if (!user) continue
      targets.push(user)
    }

    if (mentions.size !== targets.length) {
      return opts.msg.reply('Похоже, что некоторые из указанных вами юзеров ещё не зарегистрировались.')
    }

    const team = this.teamRepository.create({
      captain: opts.player,
      name: opts.teamName,
      players: [...targets, opts.player],
    })

    await this.teamRepository.save(team)

    return opts.msg.reply(`вы успешно зарегестрировали команду ${team.name}`)
  }
}
