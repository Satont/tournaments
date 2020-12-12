import { MessageEmbed, Role } from 'discord.js'
import { Command, CommandoMessage, CommandoClient } from 'discord.js-commando'
import { getRepository } from 'typeorm'
import { Player } from '../../entities/Player'
import CallOfDuty from '../../libs/cod'

export default class extends Command {
  readonly playerRepository = getRepository(Player)

  constructor(client: CommandoClient) {
    super(client, {
      name: 'regpl',
      group: 'general',
      memberName: 'regpl',
      description: 'Вы получите роль уровня в зависимости от вашей общедоступной статистики Warzone.',
      args: [
        {
          key: 'tag',
          prompt: 'Введите ваш activision тэг',
          type: 'string',
        },
      ],
    })
  }

  async run(msg: CommandoMessage, { tag }) {
    try {
      const [warZoneProfile, mpProfile] = await Promise.all([
        CallOfDuty.MWBattleData(tag),
        CallOfDuty.MWmp(tag),
      ])

      const user = await this.playerRepository.findOne({ userId: msg.author.id }) || await (this.playerRepository.create({ userId: msg.author.id, activision: tag })).save()

      const [tier1, tier2, tier3] = [
        msg.guild.roles.cache.find(r => r.name === 'Tier 1'),
        msg.guild.roles.cache.find(r => r.name === 'Tier 2'),
        msg.guild.roles.cache.find(r => r.name === 'Tier 3'),
      ]

      const kd = Number(warZoneProfile.br_all.kdRatio.toFixed(2))
      let roleForAdd: Role

      if (kd >= 5) {
        roleForAdd = tier1
      } else if (kd >= 3 && kd <= 4.9) {
        roleForAdd = tier2
      } else {
        roleForAdd = tier3
      }

      msg.member.roles.add(roleForAdd).catch(() => null)
      const embed = new MessageEmbed({
        thumbnail: {
          url: msg.member.user.avatarURL(),
        },
        description: `User: ${msg.author}\nNickname: ${tag}`,
        fields: [
          {
            name: 'Warzone',
            value: [
              `K/D: ${kd}`,
              `SPM: ${warZoneProfile.br_all.scorePerMinute.toFixed()}`,
              `Matches: ${warZoneProfile.br_all.gamesPlayed}`,
              `Winrate: ${(100 * warZoneProfile.br_all.wins/warZoneProfile.br_all.gamesPlayed).toFixed(1)}%`,
            ].join('\n'),
            inline: true,
          },
          {
            name: 'MultiPlayer',
            value: [
              `K/D: ${mpProfile.lifetime.all.properties.kdRatio.toFixed(2)}`,
              `SPM: ${mpProfile.lifetime.all.properties.scorePerMinute.toFixed()}`,
              `Matches: ${mpProfile.lifetime.all.properties.gamesPlayed}`,
              `Winrate: ${(100 * mpProfile.lifetime.all.properties.wins/mpProfile.lifetime.all.properties.totalGamesPlayed).toFixed(1)}%`,
            ].join('\n'),
            inline: true,
          },
          {
            name: 'Tournaments Warzone',
            value: [
              `Points: ${user.statsBr.points}`,
              `Matches: ${user.statsBr.matches}`,
              `Winrate: ${user.statsBr.wins}`,
            ].join('\n'),
            inline: false,
          },
          {
            name: 'Tournaments MultiPlayer',
            value: [
              `Points: ${user.statsMp.points}`,
              `Matches: ${user.statsMp.matches}`,
              `Winrate: ${user.statsMp.wins}`,
            ].join('\n'),
            inline: false,
          },
        ],
      })

      return msg.say(embed)
    } catch (e) {
      if (e.message.includes('duplicate key')) {
        msg.reply(`Игрок с тэгом ${tag} уже зарегистрирован. Если это ваш аккаунт, то обратитесь к администрации.`)
      } else {
        console.error(e)
        msg.reply('Ваш профиль не найден или произошла ошибка при регистрации. Проверьте правильно введённого тэга и попробуйте снова. Если ошибка не уходит, то обратитесь к администрации.')
      }
    }
  }

  usage(argString: string, prefix: string) {
    return `${prefix}reg coolguy#1437625`
  }
}
