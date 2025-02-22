import { UUID } from 'crypto';
import { PrimaryGeneratedColumn, Column, Entity,Generated ,OneToMany, ManyToMany,ManyToOne ,JoinTable, Unique } from 'typeorm';
import { MovieGenre } from '../GenreMovie/movie_genre.entity';

@Entity({ name: 'genre' })
@Unique(['id'])

export class Genre {
  @PrimaryGeneratedColumn("identity")
  id: number;
  
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @OneToMany(() => MovieGenre, movieGenre => movieGenre.genre)
  movieGenres: MovieGenre[];

}