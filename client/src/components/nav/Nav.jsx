import logo from '../../images/logo.png';
import styles from '../nav/Nav.module.css';
import SearchBar from '../searchBar/SearchBar.jsx';
import { Link } from 'react-router-dom';

const Nav = () => {

    return (
        <>
            <nav className={styles.nav}>
                <div className={styles.container}>
                    <Link to="/home" ><img src={logo} className={styles.logo} alt="logo" /></Link>
                    <SearchBar/>
                    <Link to="/pokemon" className={styles.btnCreatePokemon}>CREA TU POKEMON</Link>
                </div>
            </nav>
        </>
    )
}

export default Nav;