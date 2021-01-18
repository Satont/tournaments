import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('users_stats_mp')
export class StatsMp extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ default: 0 })
  points: number

  @Column({ default: 0 })
  matches: number

  @Column({ default: 0 })
  wins: number

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
