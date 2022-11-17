import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../redux/actions";
import { Link } from "react-router-dom";
import styles from "../styles/Detail.module.css";
import DetailName from "./DetailName";
import logo from '../images/logo.png'

export default function Detail (props) {
    console.log(props)

    const dispatch = useDispatch()
    useEffect( () => {
        dispatch (getDetail(props.match.params.id));
    }, [dispatch])

    let pokemon = useSelector( (state) => state.detail )

    // return (
    //     <div>
    //         <Nav/>
    //         {
    //             myPokemon.length > 0 ?
    //             <div className={style.types}>
    //                 <h1>Soy {myPokemon[0].name}</h1>
    //                 <img src={myPokemon[0].image}/>
    //                 <h2>Vida: {myPokemon[0].hp}</h2> 
    //                 <h2>Ataque: {myPokemon[0].attack}</h2>
    //                 <h2>Defensa: {myPokemon[0].defense}</h2>
    //                 <h2>Velocidad: {myPokemon[0].speed}</h2>
    //                 <h2>Alto: {myPokemon[0].height}</h2>  
    //                 <h2>Peso: {myPokemon[0].weight}</h2>
    //                 <h3>Tipo: {myPokemon[0].types}</h3>
    //             </div> :
    //             <p>Loading...</p>
    //         }
    //         <Link to='/home'>
    //             <button>Volver</button>
    //         </Link>
    //     </div>
    // )

    return (
        <div>
          <nav className={styles.nav}>
                <div className={styles.container}>
                    <Link to="/home" ><img src={logo} className={styles.logo} alt="logo" /></Link>
                    <Link to="/home" className={styles.btnCreatePokemon}>VOLVER</Link>
                </div>
            </nav>
    
          <div className={styles.container2}>
            {
              pokemon.length > 0 ?
                <>
                  <div className={styles.containerInfo}>
                    <DetailName/>
                  </div>

                  <div className={styles.containerInfo2}>
                    <span><img src={pokemon[0].image} alt="Img not found" className={styles.img}/></span>
                    
                  </div>
                      
                  <div className={styles.containerStats}>
                    <div className={styles.stats}>
                      <div className={styles.bar}>
                        <h1>Hp</h1>
                        <div className={styles.progress} ><span className={styles.hp} style={{ width: pokemon[0].hp > 100 ? '100%' : pokemon[0].hp + '%' }} per={`${pokemon[0].hp}`}></span></div>
                      </div>
    
                      <div className={styles.bar}>
                        <div className={styles.info}>
                          <h1>Attack</h1>
                        </div>
                        <div className={styles.progress} style={{ animationDelay: '0.1s' }}><span style={{ width: pokemon[0].attack > 100 ? '100%' : pokemon[0].attack + '%' }} per={`${pokemon[0].attack}`} className={styles.attack}></span></div>
                      </div>
                      <div className={styles.bar}>
                        <div className={styles.info}>
                          <h1>Defense</h1>
                        </div>
                        <div className={styles.progress} style={{ animationDelay: '0.2s' }}><span style={{ width: pokemon[0].defense > 100 ? '100%' : pokemon[0].defense + '%' }} per={`${pokemon[0].defense}`} className={styles.defense}></span></div>
                      </div>
                      <div className={styles.bar}>
                        <div className={styles.info}>
                          <h1>Speed</h1>
                        </div>
                        <div className={styles.progress} style={{ animationDelay: '0.3s' }}><span style={{ width: pokemon[0].speed > 100 ? '100%' : pokemon[0].speed + '%' }} per={`${pokemon[0].speed}`} className={styles.speed}></span></div>
                      </div>
    
                      
                    </div>
                  </div>
                </> 
                :
                <i></i>
            }
          </div>
          
        </div>
      )
    

}