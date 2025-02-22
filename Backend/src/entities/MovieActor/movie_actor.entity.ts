import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Movie } from '../Movie/movie.entity';
import { Actor } from '../Actor/actor.entity';

@Entity({ name: 'movie_actor' })
export class MovieActor {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @ManyToOne(() => Movie, movie => movie.movieActors, { onDelete: 'CASCADE' })
  movie: Movie;

  @ManyToOne(() => Actor, actor => actor.movieActors, { onDelete: 'CASCADE' })
  actor: Actor;

  @Column({ type: 'varchar', length: 300 })
  character: string;
}
