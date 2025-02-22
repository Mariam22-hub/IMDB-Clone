import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Typography, Box, CircularProgress, Grid, Card, Avatar, Button, CardContent, Stack } from '@mui/material';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import StarIcon from '@mui/icons-material/Star';
import Link from 'next/link';
import styles from './ActorDetails.module.css';

const ActorDetail = () => {
  const router = useRouter();
  const { uuid } = router.query;
  const [actor, setActor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullBio, setShowFullBio] = useState(false);

  const toggleShowFullBio = () => {
    setShowFullBio(!showFullBio);
  };

  useEffect(() => {
    const fetchActor = async () => {
      if (!uuid) return;
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_MOVIES}/actor/${uuid}`);
      const fetchedActor = await response.json();
      console.log(fetchedActor);
      setActor(fetchedActor);
      setLoading(false);
    };

    fetchActor();
  }, [uuid]);

  if (loading) {
    return <Stack alignItems="center" justifyContent= "center"><CircularProgress/></Stack>
  }

  const bioText = "Margot Elise Robbie (born July 2, 1990) is an Australian actress and producer. Known for her work in both blockbuster and independent films, she has received several accolades, including nominations for two Academy Awards, four Golden Globe Awards, and five British Academy Film Awards. Time magazine named her one of the 100 most influential people in the world in 2017 and she was ranked as one of the world's highest-paid actresses by Forbes in 2019. Born and raised in Queensland, Robbie began her career in 2008 on the television series Neighbours, on which she was a regular until 2011. After moving to America, she led";
  const bioPreview = bioText.slice(0, 300);

  return (
    <Box>
      <Header />
      <Box className={styles.pageContainer} p={3}>
        <Box className={styles.actorDetails}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card className={styles.avatarCard}>
                <Avatar src={"/images/actor.jpg"} alt={`${actor.first_name} ${actor.last_name}`} className={styles.avatar} />
              </Card>
              <Box className={styles.personalInfo}>
                <Typography variant="h5" className={styles.subheading}>Personal information</Typography>
                <Typography fontWeight={"bold"}>Known For</Typography>
                <Typography className={styles.info}>Acting</Typography>
                <Typography fontWeight={"bold"}>Gender</Typography>
                <Typography className={styles.info}>{actor.gender}</Typography>
                <Typography fontWeight={"bold"}>Birthdate</Typography>
                <Typography className={styles.info}>{new Date(actor.birthdate).toLocaleDateString()}</Typography>
                <Typography fontWeight={"bold"}>Place of Birth</Typography>
                <Typography className={styles.info}>{actor.nationality}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h3" fontWeight="bold" className={styles.heading}>{actor.first_name} {actor.last_name}</Typography>
              <Box display="flex" alignItems="center" mt={1} mb={1}>
                <StarIcon fontSize="medium" className={styles.rating} />
                <Typography variant="h6" color="textSecondary" marginLeft="7px" component="span">{actor.avg_rating}</Typography>
                <Typography variant="body2" color="textSecondary" marginLeft="5px">(101 Reviews)</Typography>
              </Box>
              <Box mt={2} mb={2}>
                <Typography variant="h5" fontWeight="bold" className={styles.subheading}>Biography</Typography>
                <Typography variant="body1">
                  {showFullBio ? bioText : `${bioPreview}...`}
                  {bioText.length > 300 && (
                    <Button onClick={toggleShowFullBio} color="primary">
                      {showFullBio ? 'Read Less' : 'Read More'}
                    </Button>
                  )}
                </Typography>
              </Box>
              <Box mt={2} mb={2} className={styles.actorMovies}>
                <Typography variant="h5" fontWeight="bold" className={styles.subheading}>Acting</Typography>
                <ul>
                  <li>
                    {actor.movies.map((movie, index) => (
                      <Typography key={index} variant="body1">
                        {movie.title} as {movie.character}
                      </Typography>
                    ))}
                  </li>
                </ul>
              </Box>
              <Box mt={3} mb={2}>
                <Typography variant="h5" fontWeight="bold" className={styles.subheading}>Awards & Nominations</Typography>
                {actor.awards.map((award, index) => (
                  <Card key={index} className={styles.awardCard}>
                      <img src={"/images/movie.jpg"} alt={award.movie.title} className={styles.awardPoster} />
                      <Box lineHeight={"2"}>
                        <Box display="flex" alignItems="center">
                          <Typography variant="body1" fontWeight="bold">{award.title}</Typography>
                          <Typography className={styles.awardName}>{award.name}</Typography>
                        </Box>
                        <Typography variant="body2">{award.description}</Typography>
                        <Link href={`/movie/${award.movie.uuid}`} passHref style={{textDecoration: 'none'}}>
                          <Typography variant="body2" color="primary">{award.movie.title}</Typography>
                        </Link>
                      </Box>
                  </Card>
                  
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default ActorDetail;
