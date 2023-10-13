const axios = require("axios");
const { Pokemon, Type } = require("../db");
const { Op } = require("sequelize");

////! GET POKEMON BY API\\\\\
const pokeApi = "https://pokeapi.co/api/v2/pokemon";
const getPokemons = async () => {
  const response = await axios.get(`${pokeApi}?limit=150`);

  const promises = response.data.results.map((pokemon) => {
    return axios
      .get(pokemon.url)
      .then((res) => res.data)
      .then((data) => {
        const { id, name, sprites, types, weight, stats, height } = data;
        return {
          id,
          name,
          image: sprites.other["official-artwork"].front_default,
          Types: types.map((t) => t.type.name),
          hp: stats[0].base_stat,
          attack: stats[1].base_stat,
          defense: stats[2].base_stat,
          speed: stats[5].base_stat,
          weight,
          height,
          created: false,
        };
      })
      .catch((error) => error);
  });

  return await Promise.all(promises);
};
////! GET ALL POKEMONS
const getAllPokes = async () => {
  const databasePokes = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  const pokesWithTypes = databasePokes.map((poke) => {
    const Types = poke.Types.map((type) => type.name);
    return { ...poke.toJSON(), Types };
  });

  const apiPokes = await getPokemons();
  return [...pokesWithTypes, ...apiPokes];
};

////! GET BY ID \\\\
const sarchId = async (id) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const { name, sprites, types, weight, stats, height } = response.data;

  return {
    id,
    name,
    image: sprites.other["official-artwork"].front_default,
    Types: types.map((t) => t.type.name),
    hp: stats[0].base_stat,
    attack: stats[1].base_stat,
    defense: stats[2].base_stat,
    speed: stats[5].base_stat,
    weight,
    height,
    created: false,
  };
};

const getPokeById = async (id, source) => {
  const Pokedex = source === "API" ? sarchId(id) : await Pokemon.findByPk(id);

  return Pokedex;
};

////! GET BY NAME\\\\

const searchpokename = async (name) => {
  const lowerName = name.toLowerCase();
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${lowerName}`
  );
  const { id, sprites, types, weight, stats, height } = response.data;

  return {
    id,
    name,
    image: sprites.other["official-artwork"].front_default,
    Types: types.map((t) => t.type.name),
    hp: stats[0].base_stat,
    attack: stats[1].base_stat,
    defense: stats[2].base_stat,
    speed: stats[5].base_stat,
    weight,
    height,
    created: false,
  };
};
const PokemonsBYName = async (name) => {
  const apiPokemons = await searchpokename(name);
  const dbPokemons = await Pokemon.findAll({
    where: {
      name: name,
    },
  });
  return [apiPokemons, ...dbPokemons];
};

////! GET BY TYPE\\\\

const searchPokeType = async () => {
  const URLAPI = await axios.get("https://pokeapi.co/api/v2/type");
  const types = URLAPI.data.results;
  const allTypes = [];

  for (let type of types) {
    const viewExist = await Type.findOne({ where: { name: type.name } });

    viewExist
      ? allTypes.push(viewExist)
      : allTypes.push(await Type.create({ name: type.name }));
  }

  return allTypes;
};

////! Post !!\\\

const createPokemon = async ({
  name,
  hp,
  attack,
  type,
  speed,
  defense,
  height,
  weight,
  image,
}) => {
  const pokemon = await Pokemon.create({
    name,
    hp,
    image,
    attack,
    speed,
    defense,
    height,
    weight,
  });
  await pokemon.addTypes(type);

  return pokemon;
};

module.exports = {
  getPokemons,
  createPokemon,
  getPokeById,
  PokemonsBYName,
  searchPokeType,
  getAllPokes,
};
