import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ComicEntity } from './comic.entity';

@Entity()
export class HeroeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  id_heroe: number;

  @Column({
    nullable: false,
    default: '',
  })
  name: string;

  @Column({
    name: 'description',
    default: '',
  })
  description: string;

  @Column({
    nullable: false,
    default: '',
  })
  path: string;

  @Column({
    nullable: false,
    default: '',
  })
  extension: string;

  @ManyToMany( () => ComicEntity, (comic) => comic.heroes )
    @JoinTable( {name:"heroe_comic"} )
  comics: ComicEntity[];
}
