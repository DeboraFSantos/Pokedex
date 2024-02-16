const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="openModal(${pokemon.number})">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

function loadMore() {

    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }

}

function closeModal() {
    const modalDetail = document.querySelector('.modalDetail');

    modalDetail.style.display = 'none';
}

window.addEventListener('click', function (event) {
    var modal = document.querySelector('.modalDetail');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

function openModal(pokemonNumber) {
    const modal = document.querySelector('.modalDetail')
    if (modal) {
        modal.remove()
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`)
        .then((response) => response.json())
        .then((responseJson) => pokeApi.convertDetails(responseJson))
        .then((newPokemon) => {
            const bodyDoc = document.querySelector('body')

            bodyDoc.innerHTML += pokeApi.showDetails(newPokemon);

            const modalDetail = document.querySelector('.modalDetail');

            modalDetail.style.display = 'flex';
        })

}