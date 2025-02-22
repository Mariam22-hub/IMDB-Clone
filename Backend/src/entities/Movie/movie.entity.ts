// item.entity.ts
import { UUID } from 'crypto';
import { PrimaryGeneratedColumn, Column, Entity,Generated ,OneToMany, ManyToMany,ManyToOne ,JoinTable, Unique } from 'typeorm';
import { Director } from '.././Director/director.entity';
import { Festival } from '.././Festival/festival.entity';
import { MovieActor } from '../MovieActor/movie_actor.entity';
import { MovieGenre } from '../GenreMovie/movie_genre.entity';
import { AwardMovieActor } from '../AwardMovieActor/award_movie_actor.entity';

@Entity({ name: 'movie' })
@Unique(['id', 'uuid'])

export class Movie {
  @PrimaryGeneratedColumn("identity")
  id: number;
  
  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Column({ type: 'varchar', length: 5000, nullable: true, default: "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans." })
  description: string;

  @Column({ type: 'varchar', length: 300 , nullable: true, default: "1h 32m"})
  duration: string;

  @Column({ type: "timestamptz"})   
  release_date: Date;

  @Column("varchar", {length: 300, nullable: true, default: "English"})
  language: string;

  @Column({type: "varchar", length: 1000, nullable: true})
  poster: string;
    
  @Column({type: "decimal", nullable: true})
  avg_rating: string;

  @Column({ type: "timestamptz"})
  created_at: Date;

  @Column({ type: "timestamptz"})
  updated_at: Date;
  
  @Generated("uuid")
  @Column({ type: 'varchar'})
  uuid: string;

  @ManyToOne(() => Director, (director) => director.movies, {nullable: true})
  director: Director;

  @Column({type: "varchar", nullable: true})
  trailer: string;

  @OneToMany(() => MovieActor, movieActor => movieActor.movie)
  movieActors: MovieActor[];

  @OneToMany(() => MovieGenre, movieGenre => movieGenre.movie)
  movieGenres: MovieGenre[];

  @OneToMany(() => AwardMovieActor, awardMovieActor => awardMovieActor.movie)
  awardsMovieActor: AwardMovieActor[];

  @ManyToMany(
    () => Festival, 
    festival => festival.movies,
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION', nullable: true})
    @JoinTable({
      name: 'movie_festival',
      joinColumn: {
        name: 'movie',
        referencedColumnName: 'id',
      },
      inverseJoinColumn: {
        name: 'festival',
        referencedColumnName: 'id',
      },
    })
    festivals?: Festival[];
}