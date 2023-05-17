//Recuperar la lista pokedex y almacenarla en una variable (arrayPoke) 
let listaPokedex = document.querySelector('#pokedex');
let arrayPoke = [];
let favoritePokemon = []; //variable para guardar mis pokemons favoritos

//Hago una petición a la API utilizando fetch diciendo que solo coja los 150 primeros pokemons de la lista de pokemons */
async function obtenerPokemons() { //definimos la función obtenerPokemons
  const url = "https://pokeapi.co/api/v2/pokemon/"; //variable ulr que contiene la api de los pokemons
  const pokedex = document.getElementById("pokedex"); //elementos id del html y lo almacenamos en pokedex

  for (let i = 1; i <= 150; i++) { //bucle de 1 a 150
    try {
      const response = await fetch(url + i); //solicitud fetch
      const data = await response.json(); //await para la espera de la solicitud y lo transformamos a json

      const pokemon = { //creamos un objeto para almacenar la info de cada pokemon
        name: data.name, //nombre de pokemon
        image: data.sprites['front_default'], //la url de la imagen 
        type: data.types.map((type) => type.type.name).join(", "), //mapeamos la info que nosotros queremos
        id: data.id //el id del pokemon
      };

      arrayPoke.push(pokemon); //almacenamos los datos de cada Pokémon en el array para su posterior uso.
    } catch (error) {
      console.error(error); //por si existe un error, que no falle toda la app (por si cae la api x ejemplo)
    }
  }

  // llamo a la función para pintar los elementos en la lista
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
  pintarFavoritos(); //inicializar la visualización de los Pokémons favoritos
}

//pintar los Pokémon en la lista de la Pokédex
function pintarPokemons(pokemons) {
    const pokedex = document.getElementById("pokedex");
    pokedex.innerHTML = ''; // Limpiar la lista existente
  
    const searchInput = document.getElementById("searchInput"); //filtrar los Pokémon en función del nombre de cada pokemon
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.toLowerCase();
  
      const filteredPokemon = arrayPoke.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm)
      );
  
      pintarPokemons(filteredPokemon); // lista filtrada de los pokemons buscados 
    });
  //Bucle for que recorrer el array de pokemons, además se crea el elemento (el hijo también más abajo) y le asignamos la clase en el css
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
      }); //botón de favoritos (añadir o quitar los pokemons). Cuando se hace clic en el botón, se llama a la función toggleFavorite() y se pasa el objeto pokemon como argumento. Esto permite agregar o quitar el Pokémon de la lista de favoritos.
  
      if (favoritePokemon.some((favPokemon) => favPokemon.id === pokemon.id)) {
        favoriteButton.classList.add("favorito");
      } //condición de verificación.
  
      pokemonIdContainer.appendChild(pokemonId);
  
      listItem.appendChild(pokemonIdContainer);
      listItem.appendChild(pokemonImage);
      listItem.appendChild(pokemonName);
      listItem.appendChild(pokemonType);
      listItem.appendChild(favoriteButton);
  
      pokedex.appendChild(listItem);
    });
  }

function pintarFavoritos() { //iteración sobre los pokemons favoritos.
  const favoriteList = document.getElementById("favoriteList");
  favoriteList.innerHTML = ''; // Limpiar la lista existente

  favoritePokemon.forEach((pokemon) => {
    const listItem = document.createElement("li");
    listItem.textContent = pokemon.name; //que solo se añada el nnombre a la lista, no todos los datos.

    favoriteList.appendChild(listItem);
  });
}

 

  
