import React, { useState, useEffect } from "react";
import { getAsync } from "../services/http-client";
import "../css/CategorysAndCards.css";
import RecipeCard from "./RecipeCard";

const Lunch = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    getRecipes();
  }, []);

  useEffect(() => {
    filterRecipes();
  }, [recipes]);

  const getRecipes = async () => {
    let result = await getAsync("/recipes");
    setRecipes(result);
  };

  const filterRecipes = () => {
    let newRecipes = recipes.filter((item) => {
      return item.category === "Lunch";
    });

    setFilteredRecipes([...newRecipes]);
  };

  const handleOnRateEvent = () => {
    getRecipes();
  };

  return (
    <div className="wrapper">
      <div className="title-container">
        <h1 className="title">Lunch</h1>
        <p className="lunch-line"></p>
      </div>
      <div className="cards-container">
        {filteredRecipes
          ? filteredRecipes.map((item, index) => {
              return (
                <RecipeCard
                  key={index}
                  onRateEvent={() => handleOnRateEvent()}
                  recipe={item}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Lunch;
