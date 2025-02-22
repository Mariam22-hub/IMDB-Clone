// item.entity.ts
import { UUID } from 'crypto';
import { PrimaryGeneratedColumn, Column, Generated ,Entity, OneToMany, ManyToMany, Unique } from 'typeorm';
import { MovieActor } from '../MovieActor/movie_actor.entity';
import { Gender } from './gender.enum';
import { AwardMovieActor } from '../AwardMovieActor/award_movie_actor.entity';

@Entity({ name: 'actor' })
@Unique(['id', 'uuid'])
export class Actor {
  @PrimaryGeneratedColumn("identity")
  id: number;
  
  @Column({ type: 'varchar', length: 300 })
  first_name: string;

  @Column({ type: 'varchar', length: 300 })
  last_name: string;

  @Column({ type: "timestamptz"})
  birthdate: Date;

  @Column({type: "varchar", length: 1000})
  bio: string;

  @Column({type: "enum", enum : Gender})
  gender: Gender;

  @Column({type: "varchar", length: 300, nullable: true})
  nationality: string;

  @Column({ type: "timestamptz"})
  created_at: Date;

  @Column({ type: "timestamptz"})
  updated_at: Date;

  @Column({ type: 'varchar'})
  @Generated("uuid")
  uuid: string;

  @Column({type: "varchar", nullable: true})
  picture: string;

  @Column({type: "bigint", nullable: true})
  number_of_awards: bigint;

  @OneToMany(() => MovieActor, movieActor => movieActor.actor)
  movieActors: MovieActor[];

  @OneToMany(() => AwardMovieActor, awardMovieActor => awardMovieActor.actor)
  awardsMovieActor: AwardMovieActor[];
}