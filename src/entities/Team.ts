import { PrimaryGeneratedColumn, BaseEntity, Entity, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm'
import { Player } from './Player'
import { Tournament } from './Tournament'

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

  @ManyToMany(() => Tournament)
  @JoinTable({ name: 'tournaments_teams' })
  tournaments: Tournament[]
}
