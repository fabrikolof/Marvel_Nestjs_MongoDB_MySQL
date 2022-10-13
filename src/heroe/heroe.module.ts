// Libraries
import { Module } from '@nestjs/common';

// Controllers
import { HeroeController } from './controllers/heroe.controller';

// Services
import { HeroeSQLService } from './services/heroe-sql.service';
import { HeroeNoSQLService } from './services/heroe-nosql.service';
import { MarvelHeroesService } from './services/marvel-heroes.service';

import { HeroeEntity } from './database/entities/heroe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Heroe, HeroeSchema } from './database/schemas/heroe.nosql.schema';
import { Comic, ComicSchema } from './database/schemas/comic.nosql.schema';
import {
  ComicSummary,
  ComicSummarySchema,
} from './database/schemas/comicSummary.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([HeroeEntity]),
    HttpModule,
    MongooseModule.forFeature([
      { name: Heroe.name, schema: HeroeSchema },
      { name: Comic.name, schema: ComicSchema },
      { name: ComicSummary.name, schema: ComicSummarySchema },
    ]),
  ],
  controllers: [HeroeController],
  providers: [MarvelHeroesService, HeroeSQLService, HeroeNoSQLService],
})
export class HeroeModule {}
