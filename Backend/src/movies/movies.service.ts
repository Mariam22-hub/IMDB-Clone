import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Movie } from '../entities/Movie/movie.entity';
import { MovieDto } from '../entities/Movie/dto/movie.dto';
import { UUID } from 'crypto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async getMovies(page: number, limit: number, sort: string, search: string, genre: string): Promise<{ movies: MovieDto[], total: number }> {
    try {
      console.log(page, limit, sort);
      const sortOptions = {
        all: { 'movie.avg_rating': 'DESC', 'movie.release_date': 'DESC' }, // Default sort by rating and release date
        release_date: { 'movie.release_date': 'DESC' },
        rating: { 'movie.avg_rating': 'DESC' },
      };

      const orderBy = sortOptions[sort] || sortOptions['all'];

      const query = this.movieRepository.createQueryBuilder('movie')
        .leftJoinAndSelect('movie.director', 'director')
        .leftJoinAndSelect('movie.movieActors', 'movieActors')
        .leftJoinAndSelect('movieActors.actor', 'actor')
        .leftJoinAndSelect('movie.festivals', 'festivals')
        .leftJoinAndSelect('movie.movieGenres', 'movieGenres')
        .leftJoinAndSelect('movieGenres.genre', 'genre');

      if (search) {
        query.where('movie.title ILIKE :search', { search: `%${search}%` });
      }

      if (genre) {
        if (search) {
          query.andWhere('genre.name = :genre', { genre });
        } else {
          query.where('genre.name = :genre', { genre });
        }
      }

      query.orderBy(orderBy)
        .skip((page - 1) * limit)
        .take(limit);

      const [movies, total] = await query.getManyAndCount();

      const movieDtos = movies.map(movie => this.toMovieDto(movie));
      return { movies: movieDtos, total };

    } catch (error) {
      console.log(error);
      throw new Error('Error querying movies');
    }
  }

  async getSelectedMovie(uuid: string): Promise<{ movie: MovieDto }> {
    try {
      const movie = await this.movieRepository.findOne({
        where: { uuid: uuid },
        relations: ['director', 'movieActors', 'movieActors.actor', 'festivals', 'movieGenres', 'movieGenres.genre', 'awardsMovieActor', 'awardsMovieActor.award', 'awardsMovieActor.actor'],
      });
      const movieDto = this.toMovieDto(movie);
      return { movie: movieDto };
    } catch (error) {
      console.log(error);
    }
  }

  private toMovieDto(movie: Movie): MovieDto {
    const { id, uuid, title, release_date, poster, avg_rating, created_at,
      updated_at, trailer, language, duration, description, director, movieActors, festivals, movieGenres
    } = movie;

    return {
      id,
      uuid,
      title,
      release_date,
      poster,
      avg_rating,
      created_at,
      updated_at,
      trailer,
      language,
      duration,
      description,
      director: director ? `${director.first_name} ${director.last_name}` : null,
      actors: movieActors.length ? movieActors.map(ma => ({
        name: `${ma.actor.first_name} ${ma.actor.last_name}`,
        character: ma?.character,
        photo: ma?.actor?.picture,
        uuid: ma?.actor?.uuid
      })) : [],      
      festivals: festivals.length ? festivals.map(festival => festival.title) : [],
      genres: movieGenres.length ? movieGenres.map(mg => mg.genre.name) : [],
    };
  }
}
