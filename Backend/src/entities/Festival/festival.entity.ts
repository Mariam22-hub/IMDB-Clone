// item.entity.ts
import { UUID } from 'crypto';
import { PrimaryGeneratedColumn, Column,Generated ,Entity, Unique, ManyToMany } from 'typeorm';
import { Movie } from '../Movie/movie.entity';

@Unique(['id', 'uuid'])
@Entity({ name: 'festival' })
export class Festival {
  @PrimaryGeneratedColumn("identity")
  id: number;
  
  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Column({ type: "date"})
  date: Date;

  @Column({ type: 'varchar'})
  @Generated("uuid")
  uuid: UUID;

  @ManyToMany(
    () => Movie,
    movie => movie.festivals,
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION', nullable: true},
  )
  movies?: Movie[];
}