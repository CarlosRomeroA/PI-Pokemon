const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const {Pokemon, Type} = require('../db.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    try {
        const infoUrl = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40');
        const infoPokemons = Promise.all(
            infoUrl.data.results.map(async(pokemon) => {
                const infoPokemon = await axios.get(pokemon.url);
                const reqInfoPokemon = {
                    id: infoPokemon.data.id,
                    name: infoPokemon.data.name,
                    hp: infoPokemon.data.stats[0].base_stat,
                    attack: infoPokemon.data.stats[1].base_stat,
                    defense: infoPokemon.data.stats[2].base_stat,
                    speed: infoPokemon.data.stats[5].base_stat,
                    height: infoPokemon.data.height,
                    weight: infoPokemon.data.weight,
                    image: infoPokemon.data.sprites.other.home.front_default,
                    types: infoPokemon.data.types.map((type) => {
                        return type.type.name;
                    })
                }
                return reqInfoPokemon;
            })
            )
        return infoPokemons;
    }   catch (error) {
        return error;
    }
}

const getDbInfo = async () => {
    let pokemonsInDb = await Pokemon.findAll({
        include:{
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
    let infoPokemonsinDb = pokemonsInDb.map(pokemon => {
        return {
            id: pokemon.id,
            name: pokemon.name,
            hp: pokemon.hp,
            attack: pokemon.attack,
            defense: pokemon.defense,
            speed: pokemon.speed,
            weight: pokemon.weight,
            height: pokemon.height,
            image: pokemon.image,
            types: pokemon.types.map((type) => type.name)
        }
    })
    return infoPokemonsinDb;
}

const getAllPokemons = async () => {
   const apiInfo = await getApiInfo();
   const dbInfo = await getDbInfo();
   const allInfo = apiInfo.concat(dbInfo);
   return allInfo;
}

router.get('/pokemons', async (req, res) => {
    const name = req.query.name;
    let allPokemons = await getAllPokemons();
    if (name) {
        let pokemonName = await allPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(name.toLowerCase()));
        pokemonName.length
        ? res.status(200).send(pokemonName)
        : res.status(400).send('No existe el pokemon, lo siento!')
    } else {
        res.status(200).send(allPokemons);
   }
})

router.get('/pokemons/:id', async(req, res) => {
    let id = req.params.id;
    let allPokemons = await getAllPokemons();
    if(id) {
        let pokemonId = await allPokemons.filter( pokemon => pokemon.id == id);
        pokemonId.length
        ? res.status(200).send(pokemonId)
        : res.status(404).send('No existe el pokemon, lo siento!')
    } 
})

router.get('/types', async (req, res) => {
    const infoUrl = await axios.get('https://pokeapi.co/api/v2/type');
    const types = infoUrl.data.results.map( type => type.name);
    types.forEach( name => { 
        Type.findOrCreate({
            where: {name: name}
        });         
    });
    const allTypes= await Type.findAll();
    res.send(allTypes);
})

router.post('/pokemons', async(req, res) => {
   
    let {name, hp, attack, defense, speed, weight, height, image, types} = req.body;
    
    let pokemonCreated = await Pokemon.create({
        name,
        hp,
        attack,
        defense,
        speed,
        weight,
        height,
        image: image ? image : "https://i.pinimg.com/originals/95/d5/cd/95d5cded00f3a3e8a98fb1eed568aa9f.png"
    })

    let typedb = await Type.findAll({
        where: {name: types}
    });
    
    pokemonCreated.addType(typedb);
    res.send('Pokemon creado con exito!')

})

module.exports = router;
