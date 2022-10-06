import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HeroeEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'heroe_id',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  name: string;

  @Column({
    name: 'description',
    nullable: false,
    default: '',
  })
  description: string;

  @Column({
    nullable: false,
    default: '',
  })
  thumbnail: string;

  @Column({
    nullable: false,
    default: '',
  })
  extension: string;
}
