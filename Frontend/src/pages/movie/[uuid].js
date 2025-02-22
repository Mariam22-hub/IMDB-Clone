import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Typography, Box, CircularProgress, Grid, Card, CardMedia, Link, Avatar } from '@mui/material';
import styles from './MovieDetails.module.css';
import Header from '../components/Header/Header';
import StarIcon from '@mui/icons-material/Star';
import Footer from '../components/Footer/Footer';

const MovieDetail = () => {
  const router = useRouter();
  const { uuid } = router.query;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!uuid) return;
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_MOVIES}/details/${uuid}`);
      const fetchedMovie = await response.json();
      console.log(fetchedMovie.movie)
      setMovie(fetchedMovie.movie);
      setLoading(false);
    };

    fetchMovie();
  }, [uuid]);


  return (
    <Box>
        {loading ? <CircularProgress /> : <></>}
        <Header />
        <Box className={styles.pageContainer}>
            <Box className={styles.movieDetail} p={3}>
                <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <Card className={styles.mediaCard}>
                    <CardMedia
                        component="img"
                        image="/images/movie.jpg"
                        alt={movie.title}
                        className={styles.image}
                    />
                    </Card>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Card className={styles.mediaCard}>
                    <CardMedia
                        component="video"
                        controls
                        src="/trailer.mp4"
                        title="trailer"
                        className={styles.media}
                    />
                    </Card>
                </Grid>
                </Grid>
                <Box mt={4}>
                <Typography display="inline" fontWeight={"bold"} variant="h3" color={"#003055"}>{movie.title} </Typography>
                <Typography display="inline" className={styles.movieYear}>({new Date(movie.release_date).getFullYear()})</Typography>
                <Box display="flex" alignItems="center" mt={1} mb={1} className={styles.rating}>
                    <StarIcon fontSize="small" />
                    <Typography variant="h6" color="textSecondary" marginLeft={"7px"} component="span" mr={1}>{movie.avg_rating}</Typography>
                    <Typography variant="body2" color="textSecondary">Reviews</Typography>
                </Box>
                <Typography variant="body2" color="textSecondary" fontSize={"1rem"}>{movie.duration} | {movie.genres?.join(', ')}</Typography>
                <Box mt={2} mb={2}>
                    <Typography variant="h6" fontWeight={"bold"} color={"#003055"}>Overview</Typography>
                    <Typography variant="body1">{movie.description}</Typography>
                </Box>
                <Typography color={"#003055"} variant="body1" fontWeight={"bold"}>Director:{movie.director}</Typography>
                <Typography color={"#003055"} variant="body1" fontWeight={"bold"}>Language:{movie.language}</Typography>
                </Box>
                <Box mt={4}>
                <Typography fontWeight={"bold"} variant="h6" color={"#003055"} marginBottom={"7px"}>Cast</Typography>
                <Grid container spacing={2}>
                    {movie.actors?.map((actor, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Link href={`/actor/${actor.uuid}`} passHref legacyBehavior style={{ textDecoration: 'none' }}>
                                <Card className={styles.castCard}>
                                    <Avatar src={"/images/actor.jpg"} alt={actor.name} className={styles.avatar} />
                                    <Box className={styles.actorInfo}>
                                        <Typography variant="body1" color={"#003055"} className={styles.actorName}>{actor.name}</Typography>
                                        <Typography variant="body2" className={styles.characterName}>{actor.character}</Typography>
                                    </Box>
                                </Card>
                        </Link>
                    </Grid>
                    ))}
                </Grid>
                </Box>
                <Box mt={4}>
                </Box>
            </Box>
      </Box>
      <Footer/>

    </Box>
  );
};

export default MovieDetail;
