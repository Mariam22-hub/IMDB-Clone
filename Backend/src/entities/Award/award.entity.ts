// item.entity.ts
import { UUID } from 'crypto';
import { PrimaryGeneratedColumn, Column, Generated ,Entity, OneToMany, ManyToMany, Unique } from 'typeorm';
import { MovieActor } from '../MovieActor/movie_actor.entity';
import { Movie } from '../Movie/movie.entity';
import { AwardMovieActor } from '../AwardMovieActor/award_movie_actor.entity';

@Entity({ name: 'award' })
@Unique(['id', 'uuid'])
export class Award {
  @PrimaryGeneratedColumn("identity")
  id: number;
  
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Generated("uuid")
  @Column({ type: 'varchar'})
  uuid: string;

  @OneToMany(() => AwardMovieActor, awardMovieActor => awardMovieActor.actor)
  awardsMovieActor: AwardMovieActor[];
}