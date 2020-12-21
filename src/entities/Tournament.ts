import { PrimaryGeneratedColumn, BaseEntity, Entity, Column, OneToMany } from 'typeorm'
import { TeamToTournament } from './TeamToTournament'

@Entity('tournaments')
export class Tournament extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  isRunned!: boolean

  @Column()
  type!: string

  @Column()
  channel!: string

  @OneToMany(() => TeamToTournament, team => team.tournament)
  teams!: TeamToTournament[]
}
