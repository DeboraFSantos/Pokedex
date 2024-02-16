
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.convertDetails = (pokemon) => {
    const imagePokemon = pokemon.sprites.front_default
    const pokemonDetail = new PokemonDetails(
        pokemon.name,
        pokemon.order,
        pokemon.stats,
        pokemon.height,
        pokemon.weight,
        pokemon.types,
        imagePokemon)

    return pokemonDetail
}

pokeApi.showDetails = (pokemon) => {
    const colorType = pokemon.types[0].type.name;

    pokemon.weight = pokemon.weight / 10

    const nameToUppercase = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)

    return `
        <div class="modalDetail">
            <div class="modalDetailInfo">
                <span onclick="closeModal()">X</span>
                <div class="modalHeader ${colorType}">
                    <div class="pokemonImg">
                        <img src="${pokemon.photo}" class="${colorType}-light"/>
                    </div>
                    <div class="modalTitle">
                        <h1>${nameToUppercase}</h1>
                        <ul>
                            ${pokemon.types.map((type) => `<li class="${colorType}-light">${type.type.name}</li>`).join('')}
                        </ul>
                    </div>
                </div>

                <div class="modalContent">
                    <div class="description">
                        <b>Peso: </b> ${pokemon.weight}
                    </div>
                    <div class="description">
                        <b>Status: </b> ${pokemon.stats}
                    </div>
                </div>
            </div>
        </div>
    `
}