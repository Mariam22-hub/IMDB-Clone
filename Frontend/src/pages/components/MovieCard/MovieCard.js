import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Link from 'next/link';
import styles from './MovieCard.module.css';

const MovieCard = ({ movie }) => {
    return (
        <Card className={styles.card}>
            <Link href={`/movie/${movie.uuid}`} passHref legacyBehavior>
                <a className={styles.link}>
                    <Box className={styles.imgContainer}>
                        <CardMedia
                            component="img"
                            image="/images/movie.jpg"
                            alt={movie.title}
                            className={styles.imgMovie}
                        />
                    </Box>
                    <CardContent className={styles.cardContent}>
                        <Box className={styles.rating}>
                            <StarIcon fontSize="small" />
                            <Typography variant="body2" className={styles.ratingText}>
                                {movie.avg_rating}
                            </Typography>
                        </Box>
                        <Typography variant="h5" className={styles.tileCard}>
                            {movie.title}
                        </Typography>
                        <Typography variant="body2" className={styles.date}>
                            {movie.release_date}
                        </Typography>
                    </CardContent>
                </a>
            </Link>
        </Card>
    );
};

export default MovieCard;
