import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import HeroeMongo_Dto from '../dto/mongo_nosql_dto/Heroe_Dto_Mongo';
import { HeroeNoSQLService } from '../services/heroe-nosql.service';
import { HeroeSQLService } from '../services/heroe-sql.service';
import { MarvelHeroesService } from '../services/marvel-heroes.service';

@Controller('heroe')
export class HeroeController {
  constructor(
    private readonly marvelHeroeService: MarvelHeroesService,
    private readonly heroeNoSQLService: HeroeNoSQLService,
    private readonly heroeSQLService: HeroeSQLService,
  ) {}

  // API Consumption with Axios
  // noSQL
  @Get('axios/:count/:page')
  async getAllHeroesWithAxios(
    @Param('count', ParseIntPipe) count: number,
    @Param('page', ParseIntPipe) page: number,
  ) {
    const heroes = await this.marvelHeroeService.getAllHeroesWithAxios(
      count,
      page,
    );
    return heroes;
  }
  @Get('comicsheroe/:id')
  async getComicsByHeroeId(@Param('id', ParseIntPipe) id: number) {
    const comics = await this.marvelHeroeService.getComicsByHeroeIdAxios(id);
    return comics;
  }
  @Get('heroebyid/:id')
  async getHeroeById(@Param('id', ParseIntPipe) id: number) {
    const heroe = await this.marvelHeroeService.getHeroeByIdAxios(id);
    return heroe;
  }
  @Get('comicsummary/:id') //47176
  async getComicSummaryById(@Param('id', ParseIntPipe) id: number) {
    //el parseintpipe es para transformar parametro en un int
    const comicSummary =
      await this.marvelHeroeService.getComicSummaryByComicIdAxios(id);
    return comicSummary;
  }

  @Post('guardar-heroe-nosql/:id')
  async saveAxiosHeroeNoSQL(@Param('id', ParseIntPipe) id: number) {
    const heroe_dto: HeroeMongo_Dto =
      await this.marvelHeroeService.getHeroeByIdAxios(id);
    return this.heroeNoSQLService.save(heroe_dto);
  }

  @Post('sql/:id')
  saveHeroeSQL(@Param('id') id: string) {
    // const heroe = this.marvelHeroeService.getHeroe(id);
    // transformar heroe en lo que requiero guardar
    this.heroeSQLService.save();
  }

  @Put('nosql/:idHeroeExistente/:idNuevoHeroe')
  updatedHeroeNoSQL(
    @Param('idHeroeExistente') idHeroeExistente: string,
    @Param('idNuevoHeroe') idNuevoHeroe: string,
  ) {
    // const newHeroe = this.marvelHeroeService.getHeroe(idNuevoHeroe);
    // transformar el nuevo heroe para reemplazar los datos del heroe señalado
    this.heroeNoSQLService.update();
  }

  @Put('nosql/:id')
  deleteHeroeNoSQL(@Param('id') id: string) {
    // buscar el heroe indicado en mi base de datos para poderlo borrar
    this.heroeNoSQLService.delete(id);
  }

  // API Consumption with Fetch
  @Get('fetch/:count/:page')
  async getAllHeroesWithFetch(
    @Param('count', ParseIntPipe) count: number,
    @Param('page', ParseIntPipe) page: number,
  ) {
    const heroes = await this.marvelHeroeService.getHeroesWithFetch(
      count,
      page,
    );
    return heroes;
  }
}
