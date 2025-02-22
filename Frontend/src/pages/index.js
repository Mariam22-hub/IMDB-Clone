import React from 'react';
import MovieList from './components/MoviesList/MoviesList';
import styles from '../styles/Home.module.css';
import Footer from './components/Footer/Footer';

export default function Home() {
  return (
    <div className={styles.home}>
      <MovieList />
      <Footer />
    </div>
  );
}
