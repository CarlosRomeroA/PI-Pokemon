import { orderByNameOrStrengh, filterPokemonsByCreated, filterPokemonsByType} from "../../redux/actions";
import styles from '../filters/Filters.module.css';
import { useState, } from "react";
import { useDispatch, useSelector} from "react-redux";


export default function Filters() {

const dispatch = useDispatch()
const [ currentPage, setCurrentPage ] = useState(1)
const [order, setOrder] = useState('')
const types = useSelector((state => state.types))

function handleSort(e) {
    e.preventDefault();
    dispatch(orderByNameOrStrengh(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`)
  }

  function handleFilterPokemonByCreated(e) {
    dispatch(filterPokemonsByCreated(e.target.value))
  }

  function handleFilterByType(e) {
    dispatch(filterPokemonsByType(e.target.value))
}  

return (
    <div className={styles.sectionFilters}>
        <div className={styles.divFilter}>
        <span>Order by:</span>
        <select onChange={e => handleSort(e)} className={styles.select}>
            {/* <option value="normal">Normal</option> */}
            <option value="asc">A - Z</option>
            <option value="desc">Z - A</option>
            <option value="atkH">Highest Attack</option>
            <option value="atkL">Lowest Attack</option>
        </select>
        </div>
        <div className={styles.divFilter}>
        <span>View: </span>
        <select onChange={ e => handleFilterPokemonByCreated(e)} className={styles.select}>
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
    </div>
)
        }