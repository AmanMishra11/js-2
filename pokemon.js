document.addEventListener("DOMContentLoaded", () => {

    const pokemonGrid = document.getElementById("pokemonGrid")
    const typeGrid = document.getElementById("typeGrid")
    const searchInput = document.getElementById("searchInput")
    const resetBtn = document.getElementById("resetBtn")
    const loadingSpinner = document.getElementById("loadingSpinner")
    const errorMessage = document.getElementById("errorMessage")
    const showTypesBtn = document.getElementById("showTypesBtn")
    const showAllBtn = document.getElementById("showAllBtn")
    const searchContainer = document.querySelector(".search-container")

    let allPokemon = []
    let filteredPokemon = []
    let types = []

    showTypesBtn.addEventListener("click", () => {
      typeGrid.style.display = "grid"
      pokemonGrid.style.display = "none"
      searchContainer.style.display = "none"
      if (types.length === 0) {
        fetchTypes()
      }
    })
  
    showAllBtn.addEventListener("click", () => {
      typeGrid.style.display = "none"
      pokemonGrid.style.display = "grid"
      searchContainer.style.display = "flex"
      if (allPokemon.length === 0) {
        fetchAllPokemon()
      } else {
        renderPokemon(allPokemon)
      }
    })
  

    async function fetchTypes() {
      try {
        loadingSpinner.style.display = "flex"
        const response = await fetch("https://pokeapi.co/api/v2/type/")
        const data = await response.json()
        types = data.results
        renderTypes()
      } catch (error) {
        showError("Failed to load Pokemon types")
      } finally {
        loadingSpinner.style.display = "none"
      }
    }

    function renderTypes() {
      typeGrid.innerHTML = ""
  
      types.forEach((type) => {
        const card = document.createElement("div")
        card.className = "type-card"
  
        const typeContent = document.createElement("div")
        typeContent.className = "type-content"
        typeContent.setAttribute("data-type", type.name)
  
        typeContent.innerHTML = `
                  <h2 class="type-name">${capitalizeFirstLetter(type.name)}</h2>
              `
  
        card.appendChild(typeContent)
        card.addEventListener("click", () => filterByType(type.name))
  
        typeGrid.appendChild(card)
      })
    }

    async function filterByType(type) {
      try {
        loadingSpinner.style.display = "flex"
        typeGrid.style.display = "none"
        pokemonGrid.style.display = "none"
        searchContainer.style.display = "flex"
  
        const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
        const data = await response.json()
  
        filteredPokemon = await Promise.all(
          data.pokemon.map(async (p) => {
            const pokemonResponse = await fetch(p.pokemon.url)
            return pokemonResponse.json()
          }),
        )
  
        pokemonGrid.style.display = "grid"
        renderPokemon(filteredPokemon, type)
      } catch (error) {
        showError("Failed to filter Pokemon")
      } finally {
        loadingSpinner.style.display = "none"
      }
    }

    async function fetchAllPokemon() {
      try {
        loadingSpinner.style.display = "flex"
  
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        const data = await response.json()
  
        allPokemon = await Promise.all(
          data.results.map(async (pokemon) => {
            const pokemonResponse = await fetch(pokemon.url)
            return pokemonResponse.json()
          }),
        )
  
        filteredPokemon = allPokemon
        renderPokemon(filteredPokemon)
      } catch (error) {
        showError("Failed to load Pokemon")
      } finally {
        loadingSpinner.style.display = "none"
      }
    }

    function renderPokemon(pokemonList, selectedType = null) {
      pokemonGrid.innerHTML = ""
  
      pokemonList.forEach((pokemon) => {
        const card = document.createElement("div")
        card.className = "pokemon-card"
  
        const mainType = selectedType || pokemon.types[0].type.name
  
        card.innerHTML = `
                  <div class="card-inner">
                      <div class="card-front" data-type="${mainType}">
                          <img src="${pokemon.sprites.other["official-artwork"].front_default}" 
                               alt="${pokemon.name}" 
                               class="pokemon-image">
                          <h2 class="pokemon-name">${capitalizeFirstLetter(pokemon.name)}</h2>
                      </div>
                      <div class="card-back" data-type="${mainType}">
                          <h3>Stats</h3>
                          <p>Height: ${pokemon.height / 10}m</p>
                          <p>Weight: ${pokemon.weight / 10}kg</p>
                          <p>Types: ${pokemon.types.map((t) => capitalizeFirstLetter(t.type.name)).join(", ")}</p>
                          <p>Abilities: ${pokemon.abilities.map((a) => capitalizeFirstLetter(a.ability.name)).join(", ")}</p>
                      </div>
                  </div>
              `
  
        pokemonGrid.appendChild(card)
      })
    }

    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase()
      const searchResults = filteredPokemon.filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm))
      renderPokemon(searchResults)
    })

    resetBtn.addEventListener("click", () => {
      searchInput.value = ""
      typeGrid.style.display = "grid"
      pokemonGrid.style.display = "none"
      searchContainer.style.display = "none"
    })

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
  
    function showError(message) {
      errorMessage.textContent = message
      errorMessage.style.display = "block"
      setTimeout(() => {
        errorMessage.style.display = "none"
      }, 3000)
    }
  })
  
  