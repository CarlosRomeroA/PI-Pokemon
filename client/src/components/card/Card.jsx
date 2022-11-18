import React from "react";
import { Link } from "react-router-dom";
import "../card/Card.css";

export default function Card({name, image, id}) {
  return (
    <div class="slide-container">
      <Link to={`/pokemons/${id}`} >
        <div class="clash-card goblin">
          <div class="clash-card__image clash-card__image--goblin">
            <img src={image} alt="imagen no encontrada"/>
          </div>
          <div class="clash-card__unit-name">
            <h2> {name} </h2> 
            
          </div>
          <div class="clash-card__unit-stats clash-card__unit-stats--goblin clearfix">
            <div class="one-third no-border">
              <div class="stat-value">tipos:</div>
              <div class="stat">Grass</div>
        
              
            {/* </div>
            <div class="one-third">
              <div class="stat">16</div>
              <div class="stat-value">Speed</div>
            </div>
            <div class="one-third no-border">
              <div class="stat">150</div>
              <div class="stat-value">Cost</div> */}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}