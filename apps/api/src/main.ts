/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import { pokemonList } from './pokemon';
import cors from 'cors';

import { pokemon } from '@nx-nextjs-monorepo/shared-types';

const app = express();
app.use(cors());
// Parse JSON bodies (req.body)
app.use(express.json());
// Priority serve any static files.
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

app.get('/pokemon', (req, res) => {
  res.send(pokemonList);
});

app.get('/search', (req, res) => {
  const searchTerm = (req.query.name as string)?.toString().toLowerCase() || '';
  console.log('searchTerm', searchTerm);

  if (!searchTerm) return res.status(400).send('Missing search term');

  const filteredPokemon: pokemon[] = pokemonList.filter(({ name }) =>
    name.toLowerCase().includes(searchTerm)
  );
  res.send(filteredPokemon);
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
