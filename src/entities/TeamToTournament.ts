import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Team } from './Team'
import { Tournament } from './Tournament'

@Entity()
export class TeamToTournament {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column({ nullable: true })
  comment?: string

  @ManyToOne(() => Team, team => team.tournaments, { cascade: true })
  team!: Team

  @ManyToOne(() => Tournament, tournament => tournament.teams, { cascade: true })
  tournament!: Tournament
}
