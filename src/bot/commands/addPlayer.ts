import { GuildMember } from 'discord.js'
import { Command, CommandoMessage, CommandoClient } from 'discord.js-commando'
import { getRepository } from 'typeorm'
import { Player } from '../../entities/Player'
import { Team } from '../../entities/Team'

export default class extends Command {
  readonly playerRepository = getRepository(Player)
  readonly teamRepository = getRepository(Team)

  constructor(client: CommandoClient) {
    super(client, {
      name: 'add',
      group: 'general',
      memberName: 'add',
      description: 'Добавить пользователя в команду.',
      args: [
        {
          key: 'targetMember',
          prompt: 'Пользователь для добавления',
          type: 'member',
        },
        {
          key: 'teamName',
          prompt: 'Имя команды',
          type: 'string',
        },
      ],
    })
  }

  async run(msg: CommandoMessage, { targetMember, teamName }: { targetMember: GuildMember, teamName: string }) {
    const [user, targetUser, team] = await Promise.all([
      this.playerRepository.findOne({ userId: msg.author.id }),
      this.playerRepository.findOne({ userId: targetMember.id }),
      this.teamRepository.findOne({ name: teamName }, { relations: ['captain'] }),
    ])

    if (!user || !targetUser || !team) {
      return msg.reply('игроки или команда не найдены.')
    } else if (team.captain !== user) {
      return msg.reply(`вы не являетесь капитаном команды ${team.name}`)
    } else if (!targetUser.activision) {
      return msg.reply(`игрок ${targetMember} не привязал свой activision id.`)
    } else {
      team.players.push(targetUser)
      await team.save()
    }

    return msg.say(`игрок ${targetMember} успешно добавлен в вашу команду.`)
  }
}
