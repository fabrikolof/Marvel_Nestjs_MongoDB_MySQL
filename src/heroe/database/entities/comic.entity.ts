import {Entity, Column, PrimaryGeneratedColumn, ManyToMany} from 'typeorm';
import { HeroeEntity } from './heroe.entity';

@Entity({name:"comic"})
export class ComicEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    idComic:number;

    @Column()
    name:string;
 
    @Column()
    issueNumber:number;

    // @Column() 
    // comicSummaryId: string;

    @ManyToMany( () => HeroeEntity, (heroe) => heroe.comics )
    heroes: HeroeEntity[];

}