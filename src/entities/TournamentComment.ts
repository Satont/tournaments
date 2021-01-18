import { PrimaryGeneratedColumn, BaseEntity, Entity, ManyToOne, OneToOne, Column, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Player } from './Player'
import { Tournament } from './Tournament'

@Entity('tournaments_comments')
export class TournamentComment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => Player, { nullable: false })
  author!: Player

  @ManyToOne(() => Tournament, team => team.comments)
  tournament!: Tournament

  @Column('text')
  text: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
