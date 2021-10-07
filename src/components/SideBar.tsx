import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Button } from './Button';
import '../styles/sidebar.scss';
import Genre from '../entities/genre';

interface SideBarProps {
  setSelectedGenre: React.Dispatch<React.SetStateAction<Genre>>;
  selectedGenreId: number;
  setSelectedGenreId: React.Dispatch<React.SetStateAction<number>>;
}

export function SideBar(props: SideBarProps) {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    api.get<Genre[]>('genres').then((response) => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<Genre>(`genres/${props.selectedGenreId}`).then((response) => {
      props.setSelectedGenre(response.data);
    });
  }, [props.selectedGenreId]);

  function handleClickButton(id: number) {
    props.setSelectedGenreId(id);
  }

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={props.selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
