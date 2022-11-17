import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemons } from "../redux/actions";
import styles from "../styles/SearchBar.module.css";

export default function SearchBar() {
    const dispatch = useDispatch()
    let [name, setName] = useState(' ')

    function handleInputChange (e) {
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmit (e) {
        e.preventDefault()
        dispatch(getNamePokemons(name))
    }

    return (
        <div>
            <input 
                type="text"
                placeholder="Busca un pokemon por su nombre..." 
                onChange={(e) => handleInputChange(e)}
                className={styles.inputSearch}  
            />
            <button
                type="submit"
                onClick={(e) => handleSubmit(e)}
                className={styles.btnSearch}
                > Buscar
            </button>
        </div>
    )
}