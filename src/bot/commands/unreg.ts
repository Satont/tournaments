import { Command, CommandoMessage, CommandoClient } from 'discord.js-commando'
import { getRepository } from 'typeorm'
import { Team } from '../../entities/Team'
import { Player } from '../../entities/Player'

export default class extends Command {
  readonly playerRepository = getRepository(Player)
  readonly teamRepository = getRepository(Team)

  constructor(client: CommandoClient) {
    super(client, {
      name: 'unreg',
      group: 'team',
      memberName: 'unreg',
      description: 'Роспуск/выход из команды.',
      args: [
        {
          key: 'teamName',
          prompt: 'Введите имя команды',
          type: 'string',
        },
      ],
    })
  }

  async run(msg: CommandoMessage, { teamName }: { teamName: string }) {
    const team = await this.teamRepository.findOne({ name: teamName }, { relations: ['captain'] })
    if (!team) return msg.reply(`команда ${teamName} не найдена`)

    if (team.captain.userId !== msg.author.id) {
      team.players = team.players.filter(player => player.userId !== msg.author.id)
      await team.save()
      return msg.reply(`вы успешно покинули команду ${teamName}`)
    } else {
      await this.teamRepository.remove(team)
      return msg.reply(`команда ${team.name} расформирована`)
    }
  }
}
