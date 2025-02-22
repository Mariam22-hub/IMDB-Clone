import React from 'react';
import { AppBar, Toolbar, TextField, Button, MenuItem, Select, InputLabel, FormControl, Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from './Header.module.css';

const Header = ({ searchValue, handleSearch, handleClick, genre, handleGenreChange, genres, isListPage }) => {
  return (
    <AppBar position="static" className={styles.appBar}>
      <Toolbar className={styles.toolbar}>
        <Box display="flex" alignItems="center" className={styles.leftSection}>
          <Button href="/" variant="h6" className={`${styles.titleCard} ${styles.largeText}`}>MMDB</Button>
          <Button href="/" className={styles.homeLink}>Home</Button>
          {isListPage && (
            <FormControl variant="outlined" className={styles.genreSelect}>
              <InputLabel shrink={genre !== ""}>
                Genre
              </InputLabel>
              <Select 
                value={genre}
                onChange={handleGenreChange}
                label="Genre"
                variant="standard"
                disableUnderline
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {genres.map((g) => (
                  <MenuItem key={g.id} value={g.name}>{g.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>
        <Box display="flex" alignItems="center" className={styles.rightSection}>
          <form className={styles.search} onSubmit={handleClick}>
            <TextField
              value={searchValue}
              onChange={handleSearch}
              type="text"
              placeholder="Search movies..."
              variant="outlined"
              InputProps={{
                endAdornment: <IconButton type="submit"><SearchIcon /></IconButton>,
                classes: { notchedOutline: styles.notchedOutline }
              }}
            />
          </form>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
