import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAsync, deleteAsync } from "../services/http-client";
import "../css/MyRecipes.css";
import IconPlus from "../assets/images/icon_plus_white.svg";
import TrashCan from "../assets/images/icon_trashcan.svg";
import Moment from "react-moment";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRecipes();
  }, []);

  const navigate = useNavigate();

  const getRecipes = async () => {
    let result = await getAsync("/my-recipes");

    setRecipes(result);
  };

  const delteRecipe = async (id) => {
    console.warn(id);
    let result = await deleteAsync(`/delete-recipe/${id}`);
    if (result) {
      getRecipes();
    }
  };

  const onUpdateRecipe = (id) => {
    navigate(`/update-recipe/${id}`);
  };

  return (
    <div className="main">
      <div className="title-content">
        <h1 className="title-MyRecipes">My Recipes</h1>
        <p className="horizontal-line_recipes"></p>
        <Link to="/add-save-recepie">
          <button className="add-btn">
            <img src={IconPlus} alt="" />
          </button>
        </Link>
      </div>

      <div className="main-container">
        <div className="header-row">
          <div className="cell">Recipe Name</div>
          <div className="cell">Category</div>
          <div className="cell">Created on</div>
          <div className="empty-cell"></div>
          <div className="cell">Delete</div>
        </div>

        {recipes
          ? recipes.map((item, index) => {
              return (
                <div className="row" key={item._id}>
                  <div
                    onClick={() => {
                      onUpdateRecipe(item._id);
                    }}
                    className="cell recipe-title"
                  >
                    {item.title}
                  </div>
                  <div
                    onClick={() => {
                      onUpdateRecipe(item._id);
                    }}
                    className="cell"
                  >
                    <button className="recipe-category">{item.category}</button>
                  </div>
                  <div
                    onClick={() => {
                      onUpdateRecipe(item._id);
                    }}
                    className="cell date"
                  >
                    <Moment format="DD.MM.YYYY">{item.createdOn}</Moment>
                  </div>
                  <div className="empty-cell"></div>
                  <div className="cell" onClick={() => delteRecipe(item._id)}>
                    <img src={TrashCan} alt="" />
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};
export default MyRecipes;
