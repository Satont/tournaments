import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm'

@Entity('settings')
export class Settings extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  space: string

  @Column({ default: 0 })
  name: string

  @Column({
    transformer: {
      to: (value: any) => JSON.stringify(value),
      from: (value: any) => JSON.parse(value),
    },
    type: 'text',
  })
  value: any
}
