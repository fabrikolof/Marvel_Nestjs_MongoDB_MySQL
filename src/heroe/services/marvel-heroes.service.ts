import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { createHash } from 'crypto';
import { ConfigService } from '@nestjs/config';
import HeroeMongo_Dto from '../dto/mongo_nosql_dto/Heroe_Dto_Mongo';
import Comic_Mongo_Dto from '../dto/mongo_nosql_dto/comic_mongo_dto';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Comic, ComicDocument } from '../database/schemas/comic.nosql.schema';

import { Heroe } from '../database/schemas/heroe.nosql.schema';
import ComicSummaryDto from '../dto/mongo_nosql_dto/comicsummary_dto';
import { HeroeNoSQLService } from './heroe-nosql.service';

@Injectable()
export class MarvelHeroesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly mongoService: HeroeNoSQLService,
    private readonly config: ConfigService,
    @InjectModel(Comic.name)
    private readonly comicModel: Model<ComicDocument>,
  ) {}

  //Axios
  getAllHeroesWithAxios(
    count: number,
    page: number,
  ): Promise<any[]> {
    const privateKey = this.config.get<string>('PRIVATE_KEY');
    const ts = this.config.get<string>('TS');
    const publicKey = this.config.get<string>('PUBLIC_KEY');
    const md5 = createHash('md5')
      .update(ts + privateKey + publicKey)
      .digest('hex');
    const uri = `https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&ts=${ts}&hash=${md5}&limit=${count}&offset=${page}`;
    return lastValueFrom(
      this.httpService.get(uri).pipe(
        map((res) => {
          const dtoList = [];
          res.data.data.results.forEach((obj_heroe) => {
            const heroe_dto = new Heroe();
            heroe_dto.id = obj_heroe.id;
            heroe_dto.name = obj_heroe.name;
            heroe_dto.description = obj_heroe.description;
            heroe_dto.comics = obj_heroe.comics;
            heroe_dto.image = `${obj_heroe.thumbnail.path}.${obj_heroe.thumbnail.extension}`;
            dtoList.push(heroe_dto);
          });
          return dtoList;
          //return `API consumida correctamente`;
        }),
      ),
    );
  }
  async getHeroeByIdAxios(heroeId: string): Promise<any> {
    const privateKey = this.config.get<string>('PRIVATE_KEY');
    const ts = this.config.get<string>('TS');
    const publicKey = this.config.get<string>('PUBLIC_KEY');
    const md5 = createHash('md5')
      .update(ts + privateKey + publicKey)
      .digest('hex');
    const uri = `https://gateway.marvel.com:443/v1/public/characters/${heroeId}?apikey=${publicKey}&ts=${ts}&hash=${md5}`; //id: 1011334
    return lastValueFrom(
      this.httpService.get(uri).pipe(
        map(async (res) => {
          const obj_heroe = res.data.data.results[0];
          const heroe_dto = new HeroeMongo_Dto();
          heroe_dto.id = obj_heroe.id;
          heroe_dto.name = obj_heroe.name;
          heroe_dto.description = obj_heroe.description;
          heroe_dto.comics = await this.getComicsByHeroeIdAxios(heroeId);
          heroe_dto.image =
            obj_heroe.thumbnail.path + '.' + obj_heroe.thumbnail.extension;
          return heroe_dto;
        }),
      ),
    );
  }
  async getComicsByHeroeIdAxios(heroeId: string): Promise<ObjectId[]> {
    const privateKey = this.config.get<string>('PRIVATE_KEY');
    const ts = this.config.get<string>('TS');
    const publicKey = this.config.get<string>('PUBLIC_KEY');
    const md5 = createHash('md5')
      .update(ts + privateKey + publicKey)
      .digest('hex');
    const uri = `https://gateway.marvel.com:443/v1/public/characters/${heroeId}/comics?apikey=${publicKey}&ts=${ts}&hash=${md5}`; //id: 1011334
    return lastValueFrom(
      this.httpService.get(uri).pipe(
        map(async (res) => {
          const result = res.data.data.results.map(async (comics) => {
            const comicDto = new Comic_Mongo_Dto();
            comicDto.id = comics.id;
            comicDto.description = comics.description;
            comicDto.title = comics.title;
            comicDto.format = comics.format;
            comicDto.comicsummary = await this.getComicSummaryByComicIdAxios(
              comics.id,
            );
            return comicDto;
          });
          const resultSolved = await Promise.all(result);
          const comicsCreados = await this.mongoService.saveComics(
            resultSolved,
          );
          return comicsCreados.map((comic) => comic._id);
        }),
      ),
    );
  }
  async getComicSummaryByComicIdAxios(comicId: number): Promise<ObjectId> {
    const privateKey = this.config.get<string>('PRIVATE_KEY');
    const ts = this.config.get<string>('TS');
    const publicKey = this.config.get<string>('PUBLIC_KEY');
    const md5 = createHash('md5')
      .update(ts + privateKey + publicKey)
      .digest('hex');
    const uri = `https://gateway.marvel.com:443/v1/public/comics/${comicId}?apikey=${publicKey}&ts=${ts}&hash=${md5}`;
    return lastValueFrom(
      this.httpService.get(uri).pipe(
        map(async (res) => {
          const result = await res.data.data.results.map((comic) => {
            const comicSummary = new ComicSummaryDto();
            comicSummary.resourceURI = comic.resourceURI;
            comicSummary.title = comic.title;
            return this.mongoService.saveComicSummary(comicSummary, comicId);
          });
          return result;
        }),
      ),
    );
  }

  //Fetch TODO
  getHeroesWithFetch(count: number, page: number): any {
    //   const privateKey = this.config.get<string>('PRIVATE_KEY');
    //   const ts = this.config.get<string>('TS');
    //   const publicKey = this.config.get<string>('PUBLIC_KEY');
    //   console.log(process.env.TS);
    //   const md5 = createHash('md5')
    //     .update(process.env.TS + process.env.PRIVATE_KEY + process.env.PUBLIC_KEY)
    //     .digest('hex');
    //   const uri = `https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&ts=${ts}&hash=${md5}&limit=${count}&offset=${page}`;
    //   return fetch(uri)
    //     .then((res) => res.json())
    //     .then((heroes: any) => {
    //       const dtoList = [];
    //       heroes.data.results.forEach((obj_heroe: any) => {
    //         const heroe_dto = new Heroe();
    //         heroe_dto.id = obj_heroe.id;
    //         heroe_dto.name = obj_heroe.name;
    //         heroe_dto.description = obj_heroe.description;
    //         heroe_dto.comics = obj_heroe.comics;
    //         dtoList.push(heroe_dto);
    //       });
    //       return dtoList;
    //     });
  }
}
