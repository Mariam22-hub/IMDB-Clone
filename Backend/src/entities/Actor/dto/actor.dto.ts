import { IsString, IsDate, IsUUID, IsEnum, IsOptional, IsInt, IsNumber } from 'class-validator';
import { Gender } from '../gender.enum';
import { Movie } from 'src/entities/Movie/movie.entity';

export class ActorDto {
  @IsInt()
  id: number;
  
  @IsUUID()
  uuid: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsDate()
  birthdate: Date;

  @IsString()
  bio: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  @IsString()
  nationality?: string;

  @IsDate()
  created_at: Date;

  @IsDate()
  updated_at: Date;

  @IsOptional()
  @IsString()
  picture?: string;

  @IsOptional()
  @IsNumber()
  number_of_awards?: bigint;

  @IsOptional()
  movies?: {
    title: string;
    character: string;
  }[];

  @IsOptional()
  awards?: {
    name: string
    title: string;
    description: string;
    movie: Movie,
    poster: string
  }[];
}
