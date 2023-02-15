import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { getAsync, putAsync } from "../services/http-client";
import "../css/AddRecipe.css";
import IconBack from "../assets/images/icon_back_white.svg";
import DefaultImg from "../assets/images/default_image.jpg";

const UpdateRecipes = () => {
  const [description, setDescription] = useState("");
  const [recepie, setRecepie] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [numPeople, setNumPeople] = useState();
  const [error, setError] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [uploadImageSrc, setUploadImageSrc] = useState(DefaultImg);

  useEffect(() => {
    getRecipeDetails();
  }, []);

  const onFileChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
    setUploadImageSrc(URL.createObjectURL(e.target.files[0]));
  };

  const getRecipeDetails = async () => {
    let result = await getAsync(`/single-recipe/${params.id}`);
    setDescription(result.description);
    setRecepie(result.recepie);
    setTitle(result.title);
    setCategory(result.category);
    setPrepTime(result.prepTime);
    setNumPeople(result.numPeople);
    setUploadImageSrc(
      `${process.env.REACT_APP_API_URL}/${result.userId}/images/${result.recipeImageUrl}`
    );
  };

  const updateRecipe = async () => {
    if (
      !description ||
      !recepie ||
      !title ||
      !category ||
      !prepTime ||
      !numPeople
    ) {
      setError(true);
      return false;
    }

    let formData = new FormData();

    formData.append("recipeImage", image);
    formData.append("description", description);
    formData.append("recepie", recepie);
    formData.append("title", title);
    formData.append("category", category);
    formData.append("prepTime", prepTime);
    formData.append("numPeople", numPeople);

    const userId = JSON.parse(localStorage.getItem("user")).token;
    let result = await fetch(
      `${process.env.REACT_APP_API_URL}/update-recipe/${params.id}`,
      {
        method: "put",
        headers: {
          "x-access-token": `${userId}`,
        },
        body: formData,
      }
    );
    console.warn(result);
    navigate("/my-recipes");
  };

  const onUploadImage = () => {
    document.getElementById("file_input").click();
  };

  return (
    <div className="wrapper">
      <div className="page-header">
        <h1 className="page-title">My Recipes</h1>
        <p className="horizontal-line_add-recipe"></p>
        <Link to="/my-recipes">
          <button className="back-btn">
            <img src={IconBack} alt="" />
          </button>
        </Link>
      </div>
      <div className="inputField-content">
        <div className="section_1">
          <label htmlFor="file" className="labels">
            Recipe Image
          </label>
          <input
            id="file_input"
            style={{ display: "none" }}
            type="file"
            filename="recipeImage"
            value=""
            onChange={onFileChange}
          />
          <img className="uploaded-img" src={uploadImageSrc} alt="" />
          <button
            className="uploadImg-btn"
            onClick={() => {
              onUploadImage();
            }}
          >
            Upload image
          </button>
        </div>

        <div className="section_2">
          <label className="labels">Recepie Title</label>
          <input
            className="title-input"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Recipe Title"
          />
          {error && !title && (
            <p className="invalid-input">Please enter data!</p>
          )}

          <div className="middle-section">
            <div className="middle-section_2">
              <label className="labels">Category</label>
              <select
                className="middle-inputs"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option></option>
                <option>Breakfast</option>
                <option>Brunch</option>
                <option>Lunch</option>
                <option>Dinner</option>
              </select>
              {error && !category && (
                <p className="invalid-input">Please enter data!</p>
              )}
            </div>
            <div className="middle-section_2">
              <label className="labels">Preparation Time</label>
              <input
                className="middle-inputs"
                onChange={(e) => setPrepTime(e.target.value)}
                value={prepTime}
                type="text"
                placeholder="Preparation time"
              />
              {error && !prepTime && (
                <p className="invalid-input">Please enter data!</p>
              )}
            </div>
            <div className="middle-section_2">
              <label className="labels">No. People</label>
              <input
                className="middle-inputs"
                value={numPeople && Math.max(0, numPeople)}
                onChange={(e) =>
                  setNumPeople(
                    e.target.value ? Number(e.target.value) : e.target.value
                  )
                }
                min="0"
                type="number"
                placeholder="No. People"
              />
              {error && !numPeople && (
                <p className="invalid-input">Please enter data!</p>
              )}
            </div>
          </div>
          <label className="labels">Short description</label>
          <textarea
            className="description-input"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          {error && !description && (
            <p className="invalid-input">Please enter data!</p>
          )}

          <button type="submit" className="submit-btn" onClick={updateRecipe}>
            Save
          </button>
        </div>

        <div className="section_3">
          <label className="labels">Recipe</label>
          <textarea
            className="recipe-input"
            type="text"
            onChange={(e) => setRecepie(e.target.value)}
            value={recepie}
          />
          {error && !recepie && (
            <p className="invalid-input">Please enter data!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateRecipes;
