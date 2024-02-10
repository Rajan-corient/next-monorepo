'use client';

import { pokemon } from '@nx-nextjs-monorepo/shared-types';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledPage = styled.div`
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1 {
      color: navy;
    }
  }
`;

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.styled-components file.
   */

  const [search, setSearch] = useState('');
  const [pokemonList, setPokemonList] = useState<pokemon[]>([]);

  useEffect(() => {
    fetchPokemon();
  }, [search]);

  const fetchPokemon = async () => {
    const apiUrl = 'http://localhost:3333/search?name=' + search;
    const res = await fetch(apiUrl);
    const data = await res.json();
    setPokemonList(data);
    console.log('Data', data);
  };

  return (
    <StyledPage>
      <div className="container">
        <h1>Pokemon App</h1>

        <div>
          <input
            type="text"
            id="pokemonNameInput"
            placeholder="Enter a Pokémon name..."
            value={search}
            onChange={({ target }) => setSearch(target.value)}
          />
        </div>

        <div>
          <ul>
            {/* Map through each pokemon and create an li element for it */}
            {pokemonList.map((pokemon: any) => (
              <li key={pokemon.name}>{pokemon.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </StyledPage>
  );
}
