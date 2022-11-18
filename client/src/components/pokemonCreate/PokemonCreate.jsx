import React, { useState, useEffect } from "react";

import { Link, useHistory } from "react-router-dom";
import { getTypes, postPokemon } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../nav/Nav";

// function validate(input) {
//   let errors = {};
//   if (!input.name || input.name > 20) errors.name = "Se requiere un nombre entre 1 y 20 caracteres";
//   else if (!input.types.length || input.types.length < 0) errors.types = "Se requieren types, max 2";
//   else if (!input.hp || input.hp < 1 || input.hp > 1000) errors.hp = "Se requiere HP entre 1 y 1000";
//   else if (!input.attack || input.attack < 1 || input.attack > 1000)
//     errors.attack = "Se requiere attack entre 1 y 1000";
//   else if (!input.defense || input.defense < 1 || input.defense > 1000)
//     errors.defense = "Se requiere defense entre 1 y 1000";
//   else if (!input.speed || input.speed < 1 || input.speed > 1000) errors.speed = "Se requiere speed entre 1 y 1000";
//   else if (!input.height || input.height < 1 || input.height > 1000)
//     errors.height = "Se requiere height entre 1 y 1000";
//   else if (!input.weight || input.weight < 1 || input.weight > 1000)
//     errors.weight = "Se requiere weight entre 1 y 1000";
//   return errors;
// }

function PokemonCreate() {
  const dispatch = useDispatch()
  const history = useHistory()
  const types = useSelector((state) => state.types)
  //const [errors, setErrors] = useState({ "": "" });

  const [input, setInput] = useState({
    name: "",
    image: "",
    types: [],
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: ""
  });

  useEffect(() => {
    dispatch(getTypes())
  }, [dispatch])

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    // setErrors(
    //   validate({
    //     ...input,
    //     [e.target.name]: e.target.value,
    //   })
    // );
  }

  function handleSelect(e) {
    setInput({
      ...input,
      types: [...input.types, e.target.value]
    });
    // setErrors(
    //   validate({
    //     ...input,
    //     types: [...input.types, e.target.value],
    //   })
    // );
  }

  function handleSubmit(e) {
    e.preventDefault();
    //if (Object.values(errors).length === 0) {
      //console.log("submit");
      dispatch(postPokemon(input))
      alert("Pokemon Created!!!")
      setInput({
        name: "",
        image: "",
        types: [],
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: ""
      });
      history.push("/home")
    } 
  

  function handleDelete(el) {
    console.log(el)
    setInput({
      ...input,
      types: input.types.filter((a) => a !== el)
    });
  }



  // console.log(errors, "soy el error");
  // console.log(input.name);

  return (
    <div>
      <Nav/>
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h2>Crea tu Pokemon</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Name: </label>
          <input type="text" value={input.name} name="name" onChange={(e) => handleChange(e)} />
        </div>
        {/* <div>{<p>{errors.name}</p>}</div> */}
        <div>
          <label>Image: </label>
          <input type="text" value={input.image} name="image" onChange={(e) => handleChange(e)} />
        </div>
        <div>
          <label>Types: </label>
          <select onChange={handleSelect}>
            {types.map((e) => (
              <option value={e.name}>
                {e.name}
              </option>
            ))}
          </select>
          <ul>
            {/* <li>{input.types.map((e) => e + " ")}</li> */}
            {input.types.map((el) => (
              <div>
                <p>{el}</p>
                <input type="button" value="x" onClick={() => handleDelete(el)} />
              </div>
            ))}
          </ul>
        </div>

        {/* <div>{<p>{errors.types}</p>}</div> */}
        <div>
          <label>Hp: </label>
          <input type="text" value={input.hp} name="hp" onChange={(e) => handleChange(e)} />
        </div>
        {/* <div>{<p>{errors.hp}</p>}</div> */}
        <div>
          <label>Attack: </label>
          <input type="text" value={input.attack} name="attack" onChange={(e) => handleChange(e)} />
        </div>
        {/* <div>{<p>{errors.attack}</p>}</div> */}
        <div>
          <label>Defense: </label>
          <input type="text" value={input.defense} name="defense" onChange={(e) => handleChange(e)} />
        </div>
        {/* <div>{<p>{errors.defense}</p>}</div> */}
        <div>
          <label>Speed: </label>
          <input type="text" value={input.speed} name="speed" onChange={(e) => handleChange(e)} />
        </div>
        {/* <div>{<p>{errors.speed}</p>}</div> */}
        <div>
          <label>Height: </label>
          <input type="text" value={input.height} name="height" onChange={(e) => handleChange(e)} />
        </div>
        {/* <div>{<p>{errors.height}</p>}</div> */}
        <div>
          <label>Weight: </label>
          <input type="text" value={input.weight} name="weight" onChange={(e) => handleChange(e)} />
        </div>
        {/* <div>{<p>{errors.weight}</p>}</div> */}
        <button>
          Crear
        </button>
      </form>
    </div>
  );
}

export default PokemonCreate;