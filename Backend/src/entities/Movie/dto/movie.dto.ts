import { IsString, IsDate, IsOptional, IsUUID, IsDecimal, IsInt} from 'class-validator';
import { UUID } from 'crypto';

export class MovieDto {
  @IsInt()
  id: number;

  @IsUUID()
  uuid: string;

  @IsString()
  title: string;

  @IsDate()
  release_date: Date;

  @IsOptional()
  @IsString()
  poster?: string;

  @IsOptional()
  @IsDecimal()
  avg_rating?: string;

  @IsDate()
  created_at: Date;

  @IsDate()
  updated_at: Date;

  @IsOptional()
  @IsString()
  trailer?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString({ each: true })
  actors?: { name: string; character: string; photo: string, uuid: string }[];

  @IsOptional()
  @IsString({ each: true })
  festivals?: string[];

  @IsOptional()
  @IsString()
  director?: string;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsString()
  duration?: string;

  @IsOptional()
  @IsString({ each: true })
  genres?: string[];
}
