import React from "react";
import styles from '../pagination/Pagination.module.css';

export default function Paginado({pokemonsPerPage, allPokemons, paginado}) {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i ++) {
        pageNumbers.push(i);
    }

    return(
        <>
            <div className={styles.pagination}>
                { pageNumbers && pageNumbers.map( number => (
                    <button>
                        <a onClick={() => paginado(number)}>{number}</a>
                    </button>
                ))}
            </div>
        </>
    )
}