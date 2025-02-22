import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Movie } from '../Movie/movie.entity';
import { Genre } from '../Genre/genre.entity';

@Entity({ name: 'movie_genre' })
export class MovieGenre {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @ManyToOne(() => Movie, movie => movie.movieGenres, { onDelete: 'CASCADE' })
  movie: Movie;

  @ManyToOne(() => Genre, genre => genre.movieGenres, { onDelete: 'CASCADE' })
  genre: Genre;

}
