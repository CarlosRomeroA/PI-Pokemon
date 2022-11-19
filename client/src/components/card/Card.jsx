import React from "react";
import { Link } from "react-router-dom";
import "../card/Card.css";

export default function Card({name, image, id, types}) {
  
  return (
    <div class="slide-container">
      <Link to={`/pokemons/${id}`} >
        <div class="clash-card goblin">
          <div class="clash-card__image clash-card__image--goblin">
            <img src={image} alt="imagen no encontrada"/>
          </div>
          <div class="clash-card__unit-name">
            <h2>{name}</h2> 
          </div>
          <div class="clash-card__unit-stats clash-card__unit-stats--goblin clearfix">
            <div class="one-third no-border">
              {/* <div class="stat-value">Type:</div> */}
              <div class="stat">
                {types.map(e => (
                <span key={e}>{e}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}