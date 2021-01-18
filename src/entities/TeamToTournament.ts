import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Team } from './Team'
import { Tournament } from './Tournament'

@Entity()
export class TeamToTournament {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column({ nullable: true })
  comment?: string

  @Column()
  teamId!: number

  @ManyToOne(() => Team, team => team.tournaments, { cascade: true })
  @JoinColumn({ name: 'teamId' })
  team!: Team

  @Column()
  tournamentId!: number

  @ManyToOne(() => Tournament, tournament => tournament.teams, { cascade: true })
  @JoinColumn({ name: 'tournamentId' })
  tournament!: Tournament

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
