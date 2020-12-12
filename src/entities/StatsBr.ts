import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm'

@Entity('users_stats_br')
export class StatsBr extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ default: 0 })
  points: number

  @Column({ default: 0 })
  matches: number

  @Column({ default: 0 })
  wins: number
}
