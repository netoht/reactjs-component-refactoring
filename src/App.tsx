import { useState } from 'react';
import { Content } from './components/Content';
import { SideBar } from './components/SideBar';
import Genre from './entities/genre';
import './styles/global.scss';

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar
        setSelectedGenre={setSelectedGenre}
        selectedGenreId={selectedGenreId}
        setSelectedGenreId={setSelectedGenreId}
      />

      <Content
        selectedGenre={selectedGenre}
        selectedGenreId={selectedGenreId}
      />
    </div>
  );
}
