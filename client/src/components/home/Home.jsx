import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypes, filterPokemonsByType, orderByName, filterPokemonsByCreated} from "../../redux/actions";
import { Link } from "react-router-dom";
import Card from "../card/Card";
import Paginado from "../pagination/Pagination";
import Nav from "../nav/Nav";
import styles from "../home/Home.module.css"

export default function Home() {
    
    
    const allPokemons = useSelector(state => state.pokemons)
    const [ currentPage, setCurrentPage ] = useState(1)
    const [ pokemonsPerPage, setPokemonsPerPage ] = useState(12)
    const indexOfLastPokemon = currentPage * pokemonsPerPage
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)
    const [order, setOrder] = useState(' ');
    const types = useSelector(state => state.types);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    
   let dispatch = useDispatch();

    useEffect(() => {
    dispatch(getTypes());
    if(!allPokemons.length)dispatch(getPokemons());
    }, []);
    
    useEffect(() => {
        setCurrentPage(1);
      }, [allPokemons.length, setCurrentPage]);

    function handleFilterPokemonByCreated(e) {
        dispatch(filterPokemonsByCreated(e.target.value))
    }

    function handleFilterByType(e) {
        dispatch(filterPokemonsByType(e.target.value))
    }  
    
    function handleSort(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`)
    }

    function handleClick(e) {
        e.preventDefault();
        dispatch(getPokemons());
    }

    return (
        <div>
            <Nav/>
            
            <div className={styles.sectionFilters}>
                
                <div className={styles.divFilter}>
                    <span>Order by:</span>
                    <select onChange={e => handleSort(e)} className={styles.select}>
                        <option value="normal">Normal</option>
                        <option value="asc">A - Z</option>
                        <option value="desc">Z - A</option>
                        <option value="atkH">Highest Attack</option>
                        <option value="atkL">Lowest Attack</option>
                    </select>
                </div>

                <div className={styles.divFilter}>
                    <span>View: </span>
                    <select onChange={e => handleFilterPokemonByCreated(e)} className={styles.select}>
                        <option value="All">All Pokemons</option>
                        <option value="Created">Created</option>
                        <option value="Api">Originals</option>
                    </select>
                </div>
                
                <div className={styles.divFilter}>
                    <span>Filter by: </span>
                    <select onChange={ e => handleFilterByType(e)} className={styles.select}>
                        <option value="All">All Types</option>
                        {
                        types?.map( type => (
                            <option value={type.name} key={type.name}>{type.name}</option>
                        ))
                        }
                    </select>
                </div>

                <div className={styles.divFilter}>
                    <button className={styles.btnReload} onClick={e => { handleClick(e) }}>Reset</button>
                </div>
                
            </div>

            {/* <Paginado pokemonsPerPage={pokemonsPerPage} allPokemons={allPokemons.length} paginado={paginado} /> */}
     
            <div className="cardspokemon">
            {
                 currentPokemons.length ?
                 typeof currentPokemons[0] === 'object' ?
                currentPokemons?.map((c) => {
                    return (
                        <div>
                            <Link to={"/pokemons/" + c.id}>
                                <Card name={c.name} image={c.image} id={c.id} types={c.types}/>
                            </Link>
                        </div>
                    );
                }) :
                <div className={styles.loading}>
                <img src='https://media.tenor.com/cg3uVszc7IsAAAAi/pikachu-nope.gif'alt="Pokemon not found" width="300px" />
                <span>Pokemon Type not found!</span>
              </div>
            :
            <div className={styles.loading2}>
              <h1>Loading...</h1>
              <img src="https://thumbs.gfycat.com/IdealPeacefulAmericanbittern-size_restricted.gif" alt="Loading.."width='300px' />
            </div>
        }
            
            </div>

            <Paginado pokemonsPerPage={pokemonsPerPage} allPokemons={allPokemons.length} paginado={paginado} />
        </div>
    )
}