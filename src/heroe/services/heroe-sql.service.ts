import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ComicEntity } from "../database/entities/comic.entity";
import { HeroeEntity } from "../database/entities/heroe.entity";
import { CreateHeroeSQL_Dto } from "../dto/postgres_sql_dto/create_heroe_sql_dto";

@Injectable()
export class HeroeSQLService {
  constructor(
    @InjectRepository(HeroeEntity)
    private readonly heroeRepository: Repository<HeroeEntity>,
    @InjectRepository(ComicEntity)
    private readonly comicRepository: Repository<ComicEntity>
  ) {}
  async save(heroeDto: CreateHeroeSQL_Dto, id: number) {
    // Lo buscamos en repository para ver si ya existe
    const isHeroe = await this.heroeRepository.findOneBy( {id_heroe: id} )

    const newHeroe: HeroeEntity = this.heroeDtoToHeroeEntity(heroeDto, id);

    if (!isHeroe) return await this.heroeRepository.save(newHeroe);
    
    throw new BadRequestException('El heroe No existe');

  }
  heroeDtoToHeroeEntity(heroeDto: CreateHeroeSQL_Dto, id: number): HeroeEntity {
    const heroe: HeroeEntity = new HeroeEntity();
    heroe.comics = heroeDto.comic;
    heroe.description = heroeDto.description;
    heroe.extension = heroeDto.extension;
    heroe.name = heroeDto.name;
    heroe.path = heroeDto.path;
    heroe.id_heroe = id;
    return heroe;
  }

  update() {
    throw new Error('No está implementado');
  }

  delete() {
    throw new Error('No está implementado');
  }
}
