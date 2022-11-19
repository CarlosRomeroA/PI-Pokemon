import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemons } from "../../redux/actions";
import styles from "../searchBar/SearchBar.module.css";
import lupa from "../../images/lupa.png";

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
    
        <div className={styles.div}>
            <input 
                type="text"
                placeholder="Search pokemon by name..." 
                onChange={(e) => handleInputChange(e)}
                className={styles.inputSearch}  
            />
            <button
                type="submit"
                onClick={(e) => handleSubmit(e)}
                className={styles.btnSearch}
                > <img src={lupa} alt="" className={styles.img}/>
            </button>
        </div>

        
    )
}