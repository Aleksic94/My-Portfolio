import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../css/AddRecipe.css";
import IconBack from "../assets/images/icon_back_white.svg";
import DefaultImg from "../assets/images/default_image.jpg";

const AddRecipe = () => {
  const [description, setDescription] = useState("");
  const [recepie, setRecepie] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [numPeople, setNumPeople] = useState();
  const [error, setError] = useState(false);
  const [image, setImage] = useState("");
  const [uploadImageSrc, setUploadImageSrc] = useState(DefaultImg);
  const navigate = useNavigate();

  const onFileChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
    setUploadImageSrc(URL.createObjectURL(e.target.files[0]));
  };

  const submitRecipe = async () => {
    if (
      !description ||
      !recepie ||
      !title ||
      !category ||
      !prepTime ||
      !numPeople ||
      !image
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
    let result = await fetch(`${process.env.REACT_APP_API_URL}/add-recepies`, {
      method: "post",
      headers: {
        "x-access-token": `${userId}`,
      },
      body: formData,
    });
    console.log(result);
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
          {error && !image && (
            <p className="invalid-input">Please Upload Image!</p>
          )}
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
            placeholder="Short Description"
          />
          {error && !description && (
            <p className="invalid-input">Please enter data!</p>
          )}

          <button type="submit" className="submit-btn" onClick={submitRecipe}>
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
            placeholder="Recipe"
          />
          {error && !recepie && (
            <p className="invalid-input">Please enter data!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
