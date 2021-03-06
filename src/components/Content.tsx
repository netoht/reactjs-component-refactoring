import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { MovieCard } from './MovieCard';
import '../styles/content.scss';
import Movie from '../entities/movie';
import Genre from '../entities/genre';

interface ContentProps {
  selectedGenre: Genre;
  selectedGenreId: number;
}

export function Content(props: ContentProps) {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    api
      .get<Movie[]>(`movies/?Genre_id=${props.selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);
      });
  }, [props.selectedGenreId]);

  return (
    <div className="container">
      <header>
        <span className="category">
          Categoria:<span> {props.selectedGenre.title}</span>
        </span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
