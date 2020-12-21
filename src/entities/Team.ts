import { PrimaryGeneratedColumn, BaseEntity, Entity, Column, ManyToOne, ManyToMany, OneToMany } from 'typeorm'
import { Player } from './Player'
import { TeamToTournament } from './TeamToTournament'

@Entity('teams')
export class Team extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  name!: string

  @ManyToOne(() => Player, { eager: true })
  captain!: Player

  @ManyToMany(() => Player, player => player.teams)
  players: Player[]

  @OneToMany(() => TeamToTournament, team => team.team)
  tournaments!: TeamToTournament[]
}
