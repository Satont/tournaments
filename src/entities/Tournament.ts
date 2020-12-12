import { PrimaryGeneratedColumn, BaseEntity, Entity, Column, ManyToMany, JoinTable } from 'typeorm'
import { Team } from './Team'

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

  @ManyToMany(() => Team)
  @JoinTable({ name: 'tournaments_teams' })
  teams: Team[]
}
