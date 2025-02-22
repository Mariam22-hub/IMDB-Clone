import React, { useEffect, useState } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import { Grid, Typography, Pagination, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Header from '../Header/Header';
import styles from './MoviesList.module.css';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState('all');
  const [searchValue, setSearchValue] = useState("");
  let [genres, setGenres] = useState([]);
  let [genre, setGenre] = useState("");

  useEffect(() => {
    const fetchMovies = async (page, sortOption, searchValue) => {
      console.log(process.env.NEXT_PUBLIC_API_URL_MOVIES)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_MOVIES}/movies?page=${page}&sort=${sortOption}&search=${searchValue}&genreId=${genre}`);
      const fetchedMovies = await response.json();
      setMovies(fetchedMovies.movies);
      console.log(fetchedMovies)
      setTotalPages(Math.ceil(fetchedMovies.total / 8));
    };

    fetchMovies(page, sortOption, searchValue);
  }, [page, sortOption, searchValue, genre]);

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_MOVIES}/genres`);
      const genres = await response.json();
      setGenres(genres);
    };

    fetchGenres();
  }, []);

  const handleSearch = (e) => {
    console.log(searchValue)
    console.log("target", e.target.value)
    setSearchValue(e.target.value);
  };

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  let movieList = movies.map((movie, id) => (
    <Grid item xs={12} sm={6} md={3} key={id}>
      <MovieCard movie={movie} className={styles.cardMovie} />
    </Grid>
  ));

  return (
    <div className={styles.pageContainer}>
      <Header isListPage={true} searchValue={searchValue} handleSearch={handleSearch} handleClick={handleClick} genre={genre} genres={genres} handleGenreChange={handleGenreChange} />
      <div className={styles.contentContainer}>
        <Grid container alignItems="center" justifyContent="space-between" className={styles.headerContainer}>
          <Grid item>
            <Typography variant="h4" className={styles.allMoviesHeader}>
              All Movies
            </Typography>
          </Grid>
          <Grid item>
            <FormControl variant="outlined" className={styles.sortControl}>
              <InputLabel id="sort-label">Sort By</InputLabel>
              <Select
                labelId="sort-label"
                value={sortOption}
                onChange={handleSortChange}
                label="Sort By"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="release_date">Release Date</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={3} className={styles.grid}>
          {movieList}
        </Grid>
        <div className={styles.paginationControls}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            shape="rounded"
          />
        </div>
      </div>
    </div>
  );
}

export default MovieList;