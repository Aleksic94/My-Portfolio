import React from "react";
import "../css/CardPopUp.css";
import { getDecodedToken, isAuthenticated } from "../services/auth";
import time from "../assets/images/icon_time.svg";
import plate from "../assets/images/icon_plate.svg";
import { StarIcon } from "@heroicons/react/24/solid";

const CardPopUp = ({ closePopUp, recipe, onRate }) => {
  return recipe ? (
    <>
      <div className="popUp" key={recipe._id}>
        <div className="title-btn_content">
          <div className="popUp-title">{recipe.title}</div>
          <div
            className="popUp-btn cursor-pointer"
            onClick={() => closePopUp(false)}
          >
            x
          </div>
        </div>
        <div className="popUp-content">
          <div className="left-side">
            <img
              className="popUp-img"
              src={`${process.env.REACT_APP_API_URL}/${recipe.userId}/images/${recipe.recipeImageUrl}`}
              alt=""
            />
            <div className="best-category">
              <div className="best">Best Served For</div>
              <div className="popUp-category">{recipe.category}</div>
            </div>
            <div className="rec-description">{recipe.description}</div>
            <div className="time-num-rate_content">
              <div className="time">
                <img className="property-img" src={time} alt="" />
                {recipe.prepTime}
                <span>min</span>
              </div>
              <div className="numOf-people">
                <img className="property-img" src={plate} alt="" />
                <span>{recipe.numPeople}</span>
                <span>persons</span>
              </div>
              <div
                onClick={() => onRate()}
                className="property cursor-pointer rate"
              >
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
                {!recipe.ratings?.length ? 0 : recipe.ratings?.length}
              </div>
            </div>
          </div>
          <div className="right-side">
            <div className="recipe-details">Recipe Details</div>
            <div className="full-recipe">{recipe.recepie}</div>
          </div>
        </div>
      </div>
    </>
  ) : null;
};
export default CardPopUp;
