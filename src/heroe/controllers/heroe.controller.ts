import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import HeroeMongo_Dto from '../dto/mongo_nosql_dto/Heroe_Dto_Mongo';
import { CreateHeroeSQL_Dto } from '../dto/postgres_sql_dto/create_heroe_sql_dto';
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
  // Heroe
  @Delete('delete/nosql/:id')
  deleteHeroeNoSQL(@Param('id') id: string) {
    return this.heroeNoSQLService.delete(id);
  }
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
  async getComicsByHeroeId(@Param('id') id: string) {
    const comics = await this.marvelHeroeService.getComicsByHeroeIdAxios(id);
    return comics;
  }
  @Get('heroebyid/:id')
  async getHeroeById(@Param('id') id: string) {
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
  async saveAxiosHeroeNoSQL(@Param('id') id: string) {
    const heroe_dto: HeroeMongo_Dto =
      await this.marvelHeroeService.getHeroeByIdAxios(id);
    return this.heroeNoSQLService.save(heroe_dto);
  }

  @Put('nosql/:idHeroeExistenteMongo/:idNuevoHeroeAPIMarvel')
  async updatedHeroeNoSQL(
    @Param('idHeroeExistenteMongo') idHeroeExistenteMongo: string,
    @Param('idNuevoHeroeAPIMarvel') idNuevoHeroeAPIMarvel: string,
  ) {
    const newHeroe = await this.marvelHeroeService.getHeroeByIdAxios(
      idNuevoHeroeAPIMarvel,
    );
    // transformar el nuevo heroe para reemplazar los datos del heroe señalado
    return this.heroeNoSQLService.update(newHeroe, idHeroeExistenteMongo);
  }
  @Post('sql/:id')//1011176
  async saveHeroeSQL(@Param('id') id: string) {
    console.log(id);
    console.log(typeof id);
    const heroeSQL = await this.marvelHeroeService.getHeroeByIdAxios(id);
    // transformar heroe en lo que requiero guardar
    //const heroe: HeroeEntity = this.fromDtoToHeroe(heroeDto);
    return this.heroeSQLService.save(heroeSQL, +id);
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
