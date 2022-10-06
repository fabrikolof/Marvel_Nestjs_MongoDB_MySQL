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

@Module({
  imports: [TypeOrmModule.forFeature([HeroeEntity])],
  controllers: [HeroeController],
  providers: [MarvelHeroesService, HeroeSQLService, HeroeNoSQLService],
})
export class HeroeModule {}
