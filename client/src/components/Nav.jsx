import logo from '../images/logo.png'
import styles from '../styles/Nav.module.css';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';

const Nav = () => {

    return (
        <>
            <Nav className={styles.nav}>
                <div className={styles.container}>
                    <Link to="/home" ><img src={logo} className={styles.logo} alt="logo" /></Link>
                    <SearchBar/>
                    <Link to="/pokemon" className={styles.btnCreatePokemon}>CREA TU POKEMON</Link>
                </div>
            </Nav>
        </>
    )
}

export default Nav;