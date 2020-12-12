import { Entity, PrimaryGeneratedColumn, BaseEntity, OneToOne, CreateDateColumn, UpdateDateColumn, Column, Index, JoinColumn, ManyToMany, JoinTable } from 'typeorm'
import { Team } from './Team'
import { StatsBr } from './StatsBr'
import { StatsMp } from './StatsMp'

@Entity('players')
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Index()
  @Column()
  userId: string

  @Column({ unique: true, nullable: true })
  activision?: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @OneToOne(() => StatsBr, { eager: true, cascade: true })
  @JoinColumn()
  statsBr: StatsBr = new StatsBr()

  @OneToOne(() => StatsMp, { eager: true, cascade: true })
  @JoinColumn()
  statsMp: StatsMp = new StatsMp()

  @ManyToMany(() => Team, team => team.players)
  @JoinTable({ name: 'teams_players' })
  teams: Team[]
}
