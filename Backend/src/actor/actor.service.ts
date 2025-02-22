import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from '../entities/Actor/actor.entity';
import { ActorDto} from '../entities/Actor/dto/actor.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
  ) {}

  async getActor(uuid: string): Promise<ActorDto> {
    try {
      const actor = await this.actorRepository.findOne({
        where: { uuid: uuid },
        relations: ['movieActors', 'movieActors.movie', 'awardsMovieActor', 'awardsMovieActor.award', 'awardsMovieActor.movie'],
      });
      return this.toActorDto(actor);
    } 
    catch (error) {
      throw new BadRequestException(error);
    }
  }

  private toActorDto(actor: Actor): ActorDto {
    const { id, uuid, first_name, last_name, birthdate, bio, gender, nationality, picture, number_of_awards, created_at, updated_at, movieActors, awardsMovieActor } = actor;

    return {
      id,
      uuid,
      first_name,
      last_name,
      birthdate,
      bio,
      gender,
      nationality,
      picture,
      number_of_awards,
      created_at,
      updated_at,
      movies: movieActors?.length ? movieActors.map(ma => ({
        title: ma?.movie?.title,
        character: ma?.character,
      })) : [],
      awards: awardsMovieActor.length ? awardsMovieActor.map(award => ({
        name: award.award.name,
        title: award.title,
        description: award?.description,
        movie: award?.movie,
        poster: award?.movie?.poster
      })): [],
    };
  }
}
