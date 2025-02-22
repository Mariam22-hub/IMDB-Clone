// item.entity.ts
import { UUID } from 'crypto';
import { PrimaryGeneratedColumn, Column, Entity, Generated ,OneToMany, Unique } from 'typeorm';
import { Movie } from '../Movie/movie.entity';

enum Gender {
    MALE="Male",
    FEMALE="Female"
}

@Unique(['id', 'uuid'])
@Entity({ name: 'director' })
export class Director {
  
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
  uuid: UUID;

  @Column({type: "varchar", nullable: true})
  picture: string;

  @Column({type: "bigint", nullable: true})
  number_of_awards: bigint;

  @OneToMany(() => Movie, (movie) => movie.director)
  movies: Movie[]

}