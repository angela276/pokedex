let listaPokedex = document.querySelector('#pokedex');
let arrayPoke = [];
let favoritePokemon = [];

async function obtenerPokemons() {
  const url = "https://pokeapi.co/api/v2/pokemon/";
  const pokedex = document.getElementById("pokedex");

  for (let i = 1; i <= 150; i++) {
    try {
      const response = await fetch(url + i);
      const data = await response.json();

      const pokemon = {
        name: data.name,
        image: data.sprites['front_default'],
        type: data.types.map((type) => type.type.name).join(", "),
        id: data.id
      };

      arrayPoke.push(pokemon);
    } catch (error) {
      console.error(error);
    }
  }

  pintarPokemons(arrayPoke);
}

obtenerPokemons();

function toggleFavorite(pokemon) {
  const index = favoritePokemon.findIndex((favPokemon) => favPokemon.id === pokemon.id);

  if (index > -1) {
    // El Pokémon ya está en la lista de favoritos, así que lo quitamos
    favoritePokemon.splice(index, 1);
  } else {
    // El Pokémon no está en la lista de favoritos, así que lo agregamos
    favoritePokemon.push(pokemon);
  }

  // Vuelve a pintar los pokémones para reflejar los cambios en la lista de favoritos
  pintarPokemons(arrayPoke);
  pintarFavoritos();
}


function pintarPokemons(pokemons) {
    const pokedex = document.getElementById("pokedex");
    pokedex.innerHTML = ''; // Limpiar la lista existente
  
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.toLowerCase();
  
      const filteredPokemon = arrayPoke.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm)
      );
  
      pintarPokemons(filteredPokemon);
    });
  
    pokemons.forEach((pokemon) => {
      const listItem = document.createElement("li");
      listItem.classList.add("pokemon-item");
  
      const pokemonIdContainer = document.createElement("div");
      pokemonIdContainer.classList.add("pokemon-id-container");
  
      const pokemonId = document.createElement("span");
      pokemonId.classList.add("pokemon-id");
      pokemonId.textContent = `#${pokemon.id}`;
  
      const pokemonImage = document.createElement("img");
      pokemonImage.classList.add("pokemon-image");
      pokemonImage.src = pokemon.image;
      pokemonImage.alt = pokemon.name;
  
      const pokemonName = document.createElement("span");
      pokemonName.classList.add("pokemon-name");
      pokemonName.textContent = pokemon.name;
  
      const pokemonType = document.createElement("span");
      pokemonType.classList.add("pokemon-type");
      pokemonType.textContent = `Type: ${pokemon.type}`;
  
      const favoriteButton = document.createElement("button");
      favoriteButton.classList.add("favorite-button");
      favoriteButton.innerHTML = `<span class="heart">&#9825;</span>`;
  
      favoriteButton.addEventListener("click", () => {
        toggleFavorite(pokemon);
      });
  
      if (favoritePokemon.some((favPokemon) => favPokemon.id === pokemon.id)) {
        favoriteButton.classList.add("favorito");
      }
  
      pokemonIdContainer.appendChild(pokemonId);
  
      listItem.appendChild(pokemonIdContainer);
      listItem.appendChild(pokemonImage);
      listItem.appendChild(pokemonName);
      listItem.appendChild(pokemonType);
      listItem.appendChild(favoriteButton);
  
      pokedex.appendChild(listItem);
    });
  }

function pintarFavoritos() {
  const favoriteList = document.getElementById("favoriteList");
  favoriteList.innerHTML = ''; // Limpiar la lista existente

  favoritePokemon.forEach((pokemon) => {
    const listItem = document.createElement("li");
    listItem.textContent = pokemon.name;

    favoriteList.appendChild(listItem);
  });
}

 

  
  