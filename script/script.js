const searchBarInput = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");
const boxContainer = document.querySelector(".pokemon-box");
const themeBtn = document.querySelector(".lightMode-darkMode");






// Fetchear la data del pokemon seleccionado
const fetchPokemonData = () => {
    const value = searchBarInput.value.toLowerCase();
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${value}`;

    ifError(value);

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            renderPokemon(data);
        })
        .catch((error) => {
            error = '';
            ifError(error);
        });
}



// Capitalizar primera letra (me da toc)
const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}



// Función para adaptar resultados
const pokemonDataAdapter = (pokemonData) => {
    return {
        id: pokemonData.id,
        name: pokemonData.name.toUpperCase(),
        image: pokemonData.sprites.other.home.front_default,
        hp: pokemonData.stats[0].base_stat,
        exp: pokemonData.base_experience,
        height: pokemonData.height/10,
        weight: pokemonData.weight/10,
        types: pokemonData.types,
        attack: pokemonData.stats[1].base_stat,
        special: pokemonData.stats[2].base_stat,
        defense: pokemonData.stats[3].base_stat
    }
}



// Función para obtener los types
const getTypes = (types) => {
    return types.map((type) => {
        return `<p class="nes-text ${type.type.name}">${capitalizeFirstLetter(type.type.name)}</p>`;
    }).join('');
}



// Template
const pokemonCardTemplate = (pokemon) => {
    const {id, name, image, hp, exp, height, weight, types, attack,special, defense} = pokemonDataAdapter(pokemon);

    console.log(getTypes(types))

    return ( `
    <div class="nes-container box__img-name">
        <p>${name}</p>
        <img src="${image}">
    </div>

    <div class="features">
        <div class="box box1__types nes-container with-title">
            <p class="title">Tipo</p>
            <div class="box-row">
                ${getTypes(types)}
            </div>
        </div>

        <div class="box box2__stats nes-container with-title">
            <p class="title">Estadísticas de combate</p>
            <div class="box-row">
                <p class="nes-text is-error">Ataque: ${attack}</p>
                <p class="nes-text is-warning">Especial: ${special}</p>
                <p class="nes-text is-success">Defensa: ${defense}</p>
            </div>
        </div>

        <div class="box box3__hpExp nes-container with-title">
            <p class="title">Características físicas</p>
            <div class="box-row">
                <p class="nes-text">HP: ${hp}</p>
                <p class="nes-text">EXP: ${exp}</p>
                <p class="nes-text">Altura: ${height}mts</p>
                <p class="nes-text">Peso: ${weight}kg</p>
            </div>
        </div>

        <div class="box box3__hpExp nes-container with-title">
            <p class="title">Gracias :)</p>
            <div class="box-row">
                <a href="https://github.com/nicolas-ponce" class="nes-text" target="_blank">
                    <i class="nes-icon github is-medium"></i>
                </a>
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" class="nes-text is-primary"  target="_blank">
                    <i class="nes-icon youtube is-medium"></i>
                </a>
                <a href="https://www.instagram.com/nicolas_m_p_/" class="nes-text is-primary"  target="_blank">
                    <i class="nes-icon instagram is-medium"></i>
                </a>
            </div>
        </div>
    </div>
    `);
}


const renderPokemon = (pokemon) => {
    boxContainer.innerHTML = pokemonCardTemplate(pokemon);
    searchBarInput.classList.add("is-success");
    searchBarInput.classList.remove("is-error");
}



const ifError = (value) => {
    if(value === '') {
        searchBarInput.classList.remove("is-success");
        boxContainer.innerHTML = `
            <div class="nes-container error-div">
                <p>Por favor, ingrese un número o un nombre de un Pokemon válido!</p>
            </div>
        `;
        searchBarInput.classList.add("is-error");

        setTimeout(() => {
            boxContainer.innerHTML = '';
            searchBarInput.classList.remove("is-error");
        }, 4000);
        return;
    }

}



const initApp = () => {
    // Selecciona el texto escrito para volver a escribir
    searchBarInput.addEventListener("click", () => {
        searchBarInput.select();
    })

    // Fetchea y renderiza los pokemones
    searchBtn.addEventListener("click", () => {fetchPokemonData()})
}

initApp();
