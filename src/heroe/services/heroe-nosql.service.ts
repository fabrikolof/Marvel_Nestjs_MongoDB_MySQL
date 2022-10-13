import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { HeroeInterface } from '../database/interaces/heroe.interface';
import { Comic, ComicDocument } from '../database/schemas/comic.nosql.schema';
import {
  ComicSummary,
  ComicSummaryDocument,
} from '../database/schemas/comicSummary.schema';
import { Heroe } from '../database/schemas/heroe.nosql.schema';
import ComicSummaryDto from '../dto/mongo_nosql_dto/comicsummary_dto';
import Comic_Mongo_Dto from '../dto/mongo_nosql_dto/comic_mongo_dto';
import HeroeMongo_Dto from '../dto/mongo_nosql_dto/Heroe_Dto_Mongo';

@Injectable()
export class HeroeNoSQLService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(Heroe.name)
    private heroeModel: Model<HeroeInterface>,
    @InjectModel(Comic.name)
    private comicModel: Model<ComicDocument>, //Todo interfaces
    @InjectModel(ComicSummary.name)
    private comicSummaryModel: Model<ComicSummaryDocument>, //Todo interfaces
  ) {}
  async getHeroebyId(id: number) {
    const heroe = await this.heroeModel
      .findOne({ heroId: id })
      .populate('comics');

    if (!heroe) {
      throw new BadRequestException('El heroe no existe pues');
    }
    return heroe;
  }
  async save(heroeInput: HeroeMongo_Dto) {
    const heroe = await this.heroeModel.findOne({
      id: heroeInput.id,
    });
    if (heroe) {
      throw new BadRequestException('El heroe ya existe');
    }
    const newHeroe = await this.heroeModel.create(heroeInput);
    return newHeroe.save();
  }

  update() {
    //encontrar al heroe
    //si no lo encuentro tiro error
    //si encuentro entonces lo modifico y lo vuelvo a guardar
    throw new Error('No está implementado');
  }

  async delete(heroeId: string) {
    const heroe = await this.heroeModel.findOne({ heroeId });
    if (!heroe) {
      throw new BadRequestException('El heroe no existe');
    }
    return heroe.delete();
  }

  //-----------------
  heroeDtoToHeroeSchemaMongo(heroe_dto): Heroe {
    const heroe_schema = new Heroe();
    heroe_schema.id = heroe_dto.id;
    heroe_schema.name = heroe_dto.name;
    heroe_schema.description = heroe_dto.description;
    heroe_schema.image = heroe_dto.image;
    return heroe_schema;
  }

  //Comic
  async saveComics(comicsDto: Comic_Mongo_Dto[]) {
    const listComicsPromesas = comicsDto.map(async (comic) => {
      const isComic = await this.comicModel.findOne({ id: comic.id });
      if (isComic) {
        return isComic;
      }
      const newComic = await this.comicModel.create(comic);
      return newComic.save();
    });
    return await Promise.all(listComicsPromesas);
  }
  async updateComic(heroeId: string, createComicDto: Comic_Mongo_Dto[]) {
    const updatecomic = await this.comicModel.findByIdAndUpdate(
      heroeId,
      createComicDto,
      { new: true },
    );
    return updatecomic;
  }
  async deleteComic(heroeId: string) {
    const comicDelete = await this.comicModel.findByIdAndDelete(heroeId);
    return comicDelete;
  }
  //ComicSummary
  async saveComicSummary(comicSummaryDto: ComicSummaryDto, comicId: number) {
    const isComicSummary = await this.comicModel.findOne({ id: comicId });
    if (!isComicSummary) {
      const newComicSummary = new this.comicSummaryModel(comicSummaryDto);
      return newComicSummary.save();
    }
  }
}
