import React from "react";
import styles from "../detail/DetailSettings.module.css";
import { useSelector  } from "react-redux";

export default function DetailSettings () {

    let pokemon = useSelector( (state) => state.detail )

    return (
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
    )
}