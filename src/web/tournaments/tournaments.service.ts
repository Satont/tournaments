import { Injectable } from '@nestjs/common'
import { getRepository } from 'typeorm'
import { Tournament } from '../../entities/Tournament'

@Injectable()
export class TournamentsService {
  private readonly repository = getRepository(Tournament)

  /* getTournaments() {
    return this.repository.createQueryBuilder('t')
      .loadRelationCountAndMap('t.teams', 't.teams')
      .loadRelationCountAndMap('t.players', 't.teams.players')
      .getMany()
  } */

  getTournaments() {
    return this.repository.find({
      relations: ['teams', 'teams.team', 'teams.team.players'],
    })
  }

  getTournament(id: string) {
    return this.repository.findOne({
      where: {
        id,
      },
      relations: ['teams', 'teams.team', 'teams.team.players'],
    })
  }
}
