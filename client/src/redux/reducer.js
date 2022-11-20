const initialState = {
    pokemons: [],
    allPokemons: [],
    types: [], 
    detail: []
  }
  
function rootReducer(state = initialState, action) {
  switch (action.type) {

    case 'GET_POKEMONS':
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      }

    case 'GET_NAME_POKEMONS':
      return {
        ...state,
        pokemons: action.payload
      }
      
    case 'FILTER_BY_CREATED':
      const allPokemons2 = state.allPokemons
      const created = action.payload === "Created"
      ? allPokemons2.filter( pokemon => !Number.isInteger(pokemon.id))
      : allPokemons2.filter( pokemon => Number.isInteger(pokemon.id))    
      return {
        ...state,
        pokemons: action.payload === 'All' 
        ? allPokemons2
        : created
      }
    
      case "ORDER_BY_NAME":
        let sortedArray
  
        if (action.payload === 'asc') {
          sortedArray = state.pokemons.sort(function (a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return 1;
            }
            if (b.name.toLowerCase() > a.name.toLowerCase()) {
              return -1;
            }
            return 0;
          })
  
        }
        if (action.payload === 'desc') {
          sortedArray = state.pokemons.sort(function (a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return -1;
            }
            if (b.name.toLowerCase() > a.name.toLowerCase()) {
              return 1;
            }
            return 0;
          })
        }
        if (action.payload === 'atkH') {
          sortedArray = state.pokemons.sort(function (a, b) {
            if (a.attack > b.attack) {
              return -1;
            }
            if (b.attack > a.attack) {
              return 1;
            }
            return 0;
          })
        }
        if (action.payload === 'atkL') {
          sortedArray = state.pokemons.sort(function (a, b) {
            if (a.attack > b.attack) {
              return 1;
            }
            if (b.attack > a.attack) {
              return -1;
            }
            return 0;
          })
        }
        if (action.payload === 'normal') {
          const apiPokes = state.pokemons.filter(el => !el.createdInDb).sort(function (a, b) {
            if (a.id > b.id) {
              return 1;
            }
            if (b.id > a.id) {
              return -1;
            }
            return 0;
          })
          const dbPokes = state.pokemons.filter(el => el.createdInDb).sort(function (a, b) {
            if (a.id > b.id) {
              return 1;
            }
            if (b.id > a.id) {
              return -1;
            }
            return 0;
          })
          sortedArray = [...apiPokes, ...dbPokes]
        }
  
        return {
          ...state,
          pokemons: sortedArray
        }
    

    case 'POST_POKEMON':
       return {
          ...state
      };
    
    case 'GET_TYPES':
      return {
        ...state,
        types: action.payload
      }

    case 'GET_DETAIL':
      return {
        ...state, 
        detail: action.payload
      }

    case 'FILTER_BY_TYPES':
      const allPokemons = state.allPokemons
      const statusFiltered = action.payload === "All"
      ? allPokemons
      : allPokemons.filter( pokemon => pokemon.types.map( type => type ).includes(action.payload))
      return {
        ...state,
        pokemons: statusFiltered.length ? statusFiltered : [`${action.payload} Pokemons`]
      }  
        
    default:
        return state;
  }   
}

export default rootReducer;