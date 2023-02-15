import React, { useEffect, useState } from "react";
import { getAsync } from "../services/http-client";
import "../css/CategorysAndCards.css";
import RecipeCard from "./RecipeCard";

const Home = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [mostPopularRecipes, setMostPopularRecipes] = useState([]);

  useEffect(() => {
    getRecipes();
    getMostPopularRecipes();
  }, []);

  const getRecipes = async () => {
    let result = await getAsync("/recipes");
    setRecipes(result);
  };

  const getMostPopularRecipes = async () => {
    let result = await getAsync("/recipes?orderBy=numOfVotes&limit=6");
    setMostPopularRecipes(result);
  };

  const handleOnRateEvent = () => {
    getMostPopularRecipes();
    getRecipes();
  };

  return (
    <>
      <div className="wrapper">
        <div className="title-container">
          <h1 className="title">Fresh & New</h1>
          <p className="horizontal-line"></p>
        </div>

        <div className="cards-container">
          {recipes
            ? recipes.slice(0, 3).map((item, index) => {
                return (
                  <RecipeCard
                    onRateEvent={() => handleOnRateEvent()}
                    key={index}
                    recipe={item}
                  />
                );
              })
            : null}
        </div>

        <div className="title-container">
          <h1 className="title">Most Popular Recipes</h1>
          <p className="most_pop-line"></p>
        </div>

        <div className="cards-container">
          {mostPopularRecipes
            ? mostPopularRecipes.map((item, index) => {
                return (
                  <RecipeCard
                    onRateEvent={() => handleOnRateEvent()}
                    key={index}
                    recipe={item}
                  />
                );
              })
            : null}
        </div>
      </div>
    </>
  );
};
export default Home;
