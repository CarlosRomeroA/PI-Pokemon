import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, filterPokemonsByCreated, getTypes, filterPokemonsByType, orderByName, orderByNameOrStrengh, } from "../redux/actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Pagination";
import "../styles/Card.css"
import SearchBar from "./SearchBar";
import Nav from "./Nav";
import Filters from './Filters';

export default function Home() {
    
    const dispatch = useDispatch()
    const allPokemons = useSelector(state => state.pokemons)
    const types = useSelector(state => state.types)
    const [order, setOrder] = useState('')
    const [ currentPage, setCurrentPage ] = useState(1)
    const [ pokemonsPerPage, setPokemonsPerPage ] = useState(12)
    const indexOfLastPokemon = currentPage * pokemonsPerPage
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect( () => {
        dispatch(getPokemons());
        dispatch(getTypes());
    }, [dispatch]);

    // function handleClick(e) {
    //     e.preventDefault();
    //     dispatch(getPokemons());
    // };

    return (
        <div>
            <Nav/>
            
            <Filters/>
            <Paginado
                pokemonsPerPage={pokemonsPerPage}
                allPokemons={allPokemons.length}
                paginado={paginado} />
     
            <div className="cardspokemon">
            {
                currentPokemons?.map((c) => {
                    return (
                        <div>
                            <Link to={"/pokemons/" + c.id}>
                                <Card name={c.name} image={c.image} id={c.id}/>
                            </Link>
                        </div>
                    );
                })
            }
            </div>
            
        </div>
    )
}
