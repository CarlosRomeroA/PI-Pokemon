import logo from '../../images/logo.png';
import styles from '../nav/Nav.module.css';
import SearchBar from '../searchBar/SearchBar.jsx';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getPokemons } from '../../redux/actions';

const Nav = () => {

    const dispatch = useDispatch();

    return (
        <>
            <nav className={styles.nav}>
                <div className={styles.container}>
                    <Link to="/home" ><img src={logo} className={styles.logo} alt="logo" /></Link>
                    <SearchBar/>
                    <Link to="/pokemon" className={styles.btnCreatePokemon}>CREATE POKEMON</Link>
                </div>
            </nav>
        </>
    )
}

export default Nav;