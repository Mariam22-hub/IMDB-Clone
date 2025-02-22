import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Movie } from '../Movie/movie.entity';
import { Actor } from '../Actor/actor.entity';
import { Award } from '../Award/award.entity';

@Entity({ name: 'award_movie_actor' })
export class AwardMovieActor {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @ManyToOne(() => Movie, movie => movie.awardsMovieActor, { onDelete: 'CASCADE' })
  movie: Movie;

  @ManyToOne(() => Actor, actor => actor.awardsMovieActor, { onDelete: 'CASCADE' })
  actor: Actor;

  @ManyToOne(() => Award, award => award.awardsMovieActor, { onDelete: 'CASCADE' })
  award: Award;

  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Column({ type: 'varchar', length: 300 })
  description: string;
}
