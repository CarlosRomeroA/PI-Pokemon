import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getTypes, postPokemon } from '../../redux/actions';
import styles from "../pokemonCreate/PokemonCreate.module.css";
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';

function validate(input) {
  let errors = {};
  const pattern = new RegExp('^[A-Z]+$', 'i');

    if (!input.name || !pattern.test(input.name)) {
        !input.name 
        ? errors.name = '* This field is required!'
        : errors.name = 'Character not allowed!'
    } 

    else if (!input.life || (input.life <= 0 || input.life > 100)) {
        !input.life
        ? errors.life = '* This field is required!'
        : errors.life = "Number out of range!"
    } 

    else if (!input.attack || (input.attack <= 0 || input.attack > 100)) {
        !input.attack
        ? errors.attack = '* This field is required!'
        : errors.attack = "Number out of range!"
    } 
    
    else if (!input.defense || (input.defense <= 0 || input.defense > 100)) {
        !input.defense
        ? errors.defense = '* This field is required!'
        : errors.defense = "Number out of range!"
    }

    else if (!input.speed || (input.speed <= 0 || input.speed > 100)) {
        !input.speed
        ? errors.speed = '* This field is required!'
        : errors.speed = "Number out of range!"
    }

    else if (!input.height || (input.height <= 0 || input.height > 100)) {
        !input.height
        ? errors.height = '* This field is required!'
        : errors.height = "Number out of range!"
    }

    else if (!input.weight || (input.weight <= 0 || input.weight > 100)) {
        !input.weight
        ? errors.weight = '* This field is required!'
        : errors.weight = "Number out of range!"
    }
    
    else if (input.types.length < 1 || input.types.length > 2) {
        input.types.length < 1
        ? errors.types = "* This field is required!"
        : errors.types = "You cannot choose more than 2 types!"
    } 
    
    return errors;
}

const CreatePokemon = () => {
  const infoTypes = useSelector(state => state.types);
  const dispatch = useDispatch();
  const history = useHistory();
  const [input, setInput] = useState({
      name: '',
      image: '',
      life: '',
      attack: '',
      defense: '',
      speed: '',
      height: '',
      weight: '',
      types:[]
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
      dispatch(getTypes())
  }, [])

  const handleChange = (e) => {
      setInput({
          ...input,
          [e.target.name]: e.target.value
      })

      setErrors(validate({
          ...input,
          [e.target.name]: e.target.value
      }))
  }

  const handleSelected = (e) => {
      setInput({
          ...input,
          types: [...input.types, e.target.value]
      })

      setErrors(validate({
          ...input,
          types: [...input.types, e.target.value]
      }))
  }

  function deleteType(type){
      setInput({
          ...input,
          types:input.types.filter(el => el !== type)
      })
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!errors) {
        dispatch(postPokemon(input))
        alert("Pokemon created!")
        setInput({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        weight: '',
        height: '',
        img: '',
        types: [],
        })
        history.push('/home')
    }
    else {
        alert("Please fill all the fields correctly")
    }      

  }

  const urlImgDefect = "https://i.pinimg.com/originals/95/d5/cd/95d5cded00f3a3e8a98fb1eed568aa9f.png";

    return (
    <>
        <nav className={styles.nav}>
          <div className={styles.containerNav}>
              <Link to="/home" ><img src={logo} className={styles.logo} alt="logo" /></Link>
              <Link to="/home" className={styles.btnCreatePokemon}>BACK</Link>
          </div>
        </nav>

        <div className={styles.container}>

            <div className={styles.divFomr}>
            <form onSubmit={(e) => handleSubmit(e)}>

            <div>
                <label>Name</label>
                <input type="text" name="name" value={input.name} onChange={(e) => handleChange(e)} placeholder="Enter a name"  />
                <div className={styles.divError}>{errors.name && (<span>{errors.name}</span>)}</div>
            </div>

            <div>
                <label>Image</label>
                <input type="text" name="image" value={input.image} onChange={(e) => handleChange(e)} placeholder="Enter image url"  />
                <div className={styles.divError}>{errors.image && (<span>{errors.image}</span>)}</div>
            </div>

            <div>
                <label>
                    Hp
                </label>
                <input type="number" name="life" value={input.life} onChange={(e) => handleChange(e)} placeholder="Enter a number between 1 - 100"  />
                <div className={styles.divError}>{errors.life && (<span>{errors.life}</span>)}</div>
            </div>

            <div>
                <label>
                    Attack
                </label>
                <input type="number" name="attack" value={input.attack} onChange={(e) => handleChange(e)} placeholder="Enter a number between 1 - 100"  />
                <div className={styles.divError}>{errors.attack && (<span>{errors.attack}</span>)}</div>
            </div>

            <div>
                <label>
                    Defense
                </label>
                <input type="number" name="defense" value={input.defense} onChange={(e) => handleChange(e)} placeholder="Enter a number between 1 - 100"  />
                <div className={styles.divError}>{errors.defense && (<span>{errors.defense}</span>)}</div>
            </div>

            <div>
                <label>
                    Speed
                </label>
                <input type="number" name="speed" value={input.speed} onChange={(e) => handleChange(e)} placeholder="Enter a number between 1 - 100" />
                <div className={styles.divError}>{errors.speed && (<span>{errors.speed}</span>)}</div>
            </div>

            <div>
                <label>
                    Height
                </label>
                <input type="number" name="height" value={input.height} onChange={(e) => handleChange(e)} placeholder="Enter a number between 1 - 100"  />
                <div className={styles.divError}>{errors.height && (<span>{errors.height}</span>)}</div>
            </div>

            <div>
                <label>
                    Weight
                </label>
                <input type="number" name="weight" value={input.weight} onChange={(e) => handleChange(e)} placeholder="Enter a number between 1 - 100"  />
                <div className={styles.divError}>{errors.weight && (<span>{errors.weight}</span>)}</div>
            </div>

            <div>
                <label>
                    Types
                </label>
                <select onChange={(e) => handleSelected(e)}>
                    <option>Choose one or more options</option>
                    {infoTypes && infoTypes.map(el => (
                        <option key={el.id} value={el.name}>{el.name}</option>
                    ))}
                </select>
                <div className={styles.divError}>{errors.types && (<span>{errors.types}</span>)}</div>
            </div>

            <div>
                <input className={styles.bntSubmit}  type="submit" value="Create pokemon" />
            </div>

            </form>
            </div>

            <div class="clash-card2 goblin">

                <div class="clash-card__image clash-card__image--goblin">
                    <img src={input.image ? input.image : urlImgDefect} alt={input.name}/>
                </div>

                <div class="clash-card__unit-name">
                    <h2>{input.name ? input.name : "name"}</h2> 
                </div>

                 <div class="clash-card__unit-stats clash-card__unit-stats--goblin clearfix">
                    <div class="one-third no-border">
                        <div class="stat">
                            { input.types.length > 0
                                ? input.types.map(el => (
                                    <span class="stat">
                                        {el}<button className={styles.btnDeleteType} onClick={() => deleteType(el)}>x</button>
                                    </span>
                                    ))
                                : <span class="stat">Types</span>
                            }
                         </div>
                    </div>
                 </div>
            </div>
        </div>
    </>
    )
}

export default CreatePokemon;