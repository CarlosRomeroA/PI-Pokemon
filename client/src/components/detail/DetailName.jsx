import React from "react";
import styles from "../detail/DetailName.module.css";
import { useSelector } from "react-redux";

export default function DetailName () {
    
    let pokemon = useSelector( (state) => state.detail )
    console.log(pokemon)
    return(

        <div className={styles.card}>
            
            <span className={styles.card__title}>{pokemon[0].name}</span>
           
            
            <div class="clash-card__unit-stats2 clearfix">
                
                <div class="one-third">
                <div class="stat">{pokemon[0].height}</div>
                <div class="stat-value">HEIGHT</div>
                </div>

                <div class="one-third">
                <div class="stat">{pokemon[0].weight}</div>
                <div class="stat-value">WEIGHT</div>
                </div>

            </div>  

            <span className={styles.card__title2}>
        {pokemon[0].types.map(e=>(
          <span>{e}</span>
        ))}
      </span>
            

        </div>
    )
}

