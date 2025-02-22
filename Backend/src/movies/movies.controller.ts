// movie.controller.ts
import { Controller, Get, Query, Param } from '@nestjs/common';
import { MovieService } from '../movies/movies.service';
import { PaginationQueryDto } from '../entities/Movie/dto/pagination.dto';
import { UUID } from 'crypto';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  findMovies(
    @Query() paginationQuery: PaginationQueryDto,
    @Query('sort') sort: string,
    @Query('search') search: string,
    @Query('genreId') genreId: string
  ){
    const { page, limit } = paginationQuery;
    return this.movieService.getMovies(page, limit, sort, search, genreId);
  }

  @Get("details/:id")
  getSelectedMovie(@Param('id') id: string,){
    return this.movieService.getSelectedMovie(id);
  }
}
