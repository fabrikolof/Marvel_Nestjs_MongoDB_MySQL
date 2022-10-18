import { IsArray, IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";
import { ComicEntity } from '../../database/entities/comic.entity';

export class CreateHeroeSQL_Dto {

    @IsInt()
    @IsPositive()
    @Min(1)
    id: number;

    @IsString()
    @MinLength(1)
    name: string;
    
    @IsString()
    @MinLength(1)
    description: string;
    
    @IsString()
    @MinLength(1)
    path: string;
    
    @IsString()
    @MinLength(1)
    extension: string;
    
    @IsArray()
    comic: ComicEntity[];
}
