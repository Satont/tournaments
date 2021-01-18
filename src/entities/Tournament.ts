import { PrimaryGeneratedColumn, BaseEntity, Entity, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { TeamToTournament } from './TeamToTournament'
import { TournamentComment } from './TournamentComment'

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

  @OneToMany(() => TournamentComment, comment => comment.tournament)
  comments: TournamentComment[]

  @OneToMany(() => TeamToTournament, team => team.tournament)
  teams!: TeamToTournament[]

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
