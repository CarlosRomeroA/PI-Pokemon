import axios from "axios";

export function getPokemons() {
  return async function(dispatch){
    let pokemons = await axios.get("http://localhost:3001/pokemons");
    dispatch({
        type: 'GET_POKEMONS',
        payload: pokemons.data
    })
  }
}

export function filterPokemonsByCreated(payload) {
    return {
      type: 'FILTER_BY_CREATED',
      payload
    }
  }

export function getNamePokemons (name) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/pokemons?name=" + name);
      return dispatch({
        type: 'GET_NAME_POKEMONS',
        payload: json.data
      })
    }
    catch (error) {
      alert("El nombre del pokemon no existe")
    }
  }
} 

export function getTypes() {
  return async function (dispatch) {
    var types = await axios.get("http://localhost:3001/types")
    return dispatch({ 
      type: "GET_TYPES",
      payload: types.data
    })
  }
}

// export function postPokemon(payload) {
//   return async function (dispatch) {
//     const response = await axios.post("http://localhost:3001/pokemons", payload);
//     console.log(response)
//     return dispatch({
//       type: 'POST_POKEMON',
//       payload: response.data
//     })
//   }
// }

export function postPokemon(payload){
  return async function(dispatch){
      const respuesta = await axios.post("http://localhost:3001/pokemons", payload);
      return dispatch({
          type: 'POST_POKEMON',
          payload: respuesta.data
      });
  }
}

export function getDetail (id) {
  return async function(dispatch) {
    try{
      var json = await axios.get("http://localhost:3001/pokemons/" + id );
      console.log(json)
      return dispatch({
        type: 'GET_DETAIL',
        payload: json.data
      })
    }
    catch (error) {
      console.log(error)
    }
  }
}

export function filterPokemonsByType(payload) {
  return {
    type: 'FILTER_BY_TYPES',
    payload
  }
}

export function orderByNameOrStrengh (payload) {
  return {
    type: 'ORDER_BY_NAME_OR_STRENGH',
    payload
  }
}