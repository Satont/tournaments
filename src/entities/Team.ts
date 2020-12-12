import { PrimaryGeneratedColumn, BaseEntity, Entity, Column, ManyToOne, ManyToMany } from 'typeorm'
import { Player } from './Player'

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
}
