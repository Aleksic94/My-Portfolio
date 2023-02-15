import React, { useEffect, useState } from "react";
import time from "../assets/images/icon_time.svg";
import plate from "../assets/images/icon_plate.svg";
import arrow from "../assets/images/icon_arrows_white.svg";
import "../css/CategorysAndCards.css";
import CardPopUp from "./CardPopUp";
import { putAsync } from "../services/http-client";
import { getDecodedToken, isAuthenticated } from "../services/auth";
import { StarIcon } from "@heroicons/react/24/solid";

const RecipeCard = ({ recipe, onRateEvent }) => {
  const [openPopUp, setOpenPopUp] = useState(false);

  useEffect(() => {
    if (openPopUp) {
      document.getElementById("popup_backdrop").style.display = "block";
    } else {
      document.getElementById("popup_backdrop").style.display = "none";
    }
  }, [openPopUp]);

  const onRate = async (event) => {
    try {
      if (!isAuthenticated()) {
        return;
      }
      await putAsync(`/recipe-details/${recipe._id}/rate`);
      onRateEvent();
    } catch (err) {
      console.log(err);
    }
  };

  return recipe ? (
    <>
      <div className="card" key={recipe._id}>
        <div className="category-sticker">{recipe.category}</div>
        <img
          className="card-img"
          src={`${process.env.REACT_APP_API_URL}/${recipe.userId}/images/${recipe.recipeImageUrl}`}
          alt=""
        />
        <div className="card-content">
          <div className="card-info">
            <h3 className="item-title">{recipe.title}</h3>
            <p className="item-description">
              {recipe.description.substring(0, 192)}
            </p>
          </div>
          <div className="item-propertys">
            <div className="property">
              <img className="property-img" src={time} alt="" />
              {recipe.prepTime}
              <span>min</span>
            </div>
            <div className="property">
              <img className="property-img" src={plate} alt="" />
              <span>{recipe.numPeople}</span>
              <span>{recipe.numPeople < 2 ? "person" : "persons"}</span>
            </div>
            <div onClick={() => onRate()} className="property cursor-pointer">
              <StarIcon
                style={{
                  height: "20px",
                  width: "20px",
                  color:
                    !isAuthenticated() ||
                    (recipe.ratings &&
                      recipe.ratings.some(
                        (x) => x === getDecodedToken().user_id
                      ))
                      ? "orange"
                      : "gray",
                }}
              />
              <span>
                {!recipe.ratings?.length ? 0 : recipe.ratings?.length}
              </span>
            </div>
            <div className="btn-container">
              <button
                onClick={() => {
                  setOpenPopUp(true);
                }}
                className="arrow-btn cursor-pointer"
              >
                <img src={arrow} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {openPopUp && (
        <CardPopUp
          closePopUp={setOpenPopUp}
          recipe={recipe}
          onRateEvent={onRateEvent}
          onRate={() => onRate()}
        />
      )}
    </>
  ) : null;
};

export default RecipeCard;
