import React from 'react';
import { Grid, Typography, Link } from '@mui/material';
import styles from './Footer.module.css'; // Import the CSS module

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <Typography variant="h6" className={styles.logo}>
      <Link href="/" className={styles.link}>
          MMDB
        </Link>
      </Typography>
      <Grid container spacing={2} justifyContent="center" className={styles.links}>
        <Grid item>
          <Link href="#" className={styles.link}>
            About
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" className={styles.link}>
            Terms of Use
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" className={styles.link}>
            Privacy Policy
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" className={styles.link}>
            Help
          </Link>
        </Grid>
      </Grid>
      <Typography variant="body2" className={styles.copyright}>
        © 2023 MMDB. All rights reserved.
      </Typography>
    </div>
  );
};

export default Footer;
