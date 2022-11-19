import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import { Link } from "react-router-dom";
import styles from "../detail/Detail.module.css";
import DetailName from "../detail/DetailName";
import logo from '../../images/logo.png';
import DetailSettings from '../detail/DetailSettings'

export default function Detail (props) {
  console.log(props)

  const dispatch = useDispatch()
  useEffect( () => {
      dispatch (getDetail(props.match.params.id));
  }, [dispatch])

  let pokemon = useSelector( (state) => state.detail )

  return (
    <div>
      <nav className={styles.nav}>
        <div>
          <Link to="/home" ><img src={logo} className={styles.logo} alt="logo"/></Link>
        </div>
      </nav>
  
        <div className={styles.container}> {
          pokemon.length > 0 ?  
            <>
              <div className={styles.containerInfo1}>
                <DetailName/>
              </div>

              <div className={styles.containerInfo2}>
                <img src={pokemon[0].image} alt="Image not found" className={styles.img}/> 
              </div>
                  
              <div className={styles.containerInfo3}>
                <DetailSettings/>
              </div>
            </> 

            :
            <i></i>
        }
        </div>

     <Link to="/home" className={styles.btnCreatePokemon}>BACK</Link>

    </div>
  )
}