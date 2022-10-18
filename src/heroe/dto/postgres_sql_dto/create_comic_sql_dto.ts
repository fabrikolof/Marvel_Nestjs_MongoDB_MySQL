import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateComicSQL_Dto {

    @IsInt()
    @IsPositive()
    @Min(1)
    idComic:number;

    @IsString()
    @MinLength(1)
    name:string;
 
    @IsInt()
    @IsPositive()
    @Min(1)
    issueNumber:number;   
}