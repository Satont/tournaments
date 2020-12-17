import { Injectable } from '@nestjs/common'
import { getRepository } from 'typeorm'
import { Team } from '../../entities/Team'

@Injectable()
export class TeamsService {
  private readonly repository = getRepository(Team)

  list() {
    return this.repository.find({
      relations: ['players', 'captain', 'tournaments'],
    })
  }
}
