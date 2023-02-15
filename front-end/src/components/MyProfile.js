import React, { useEffect, useState } from "react";
import { getAsync } from "../services/http-client";
import { getDecodedToken } from "../services/auth";
import { useParams } from "react-router-dom";
import "../css/MyProfile.css";
import defaultAvatarImg from "../assets/images/default-avatar.jpg";

const MyProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState(false);
  const [image, setImage] = useState("");
  const [uploadImageSrc, setUploadImageSrc] = useState(defaultAvatarImg);
  const params = useParams();

  const onFileChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
    setUploadImageSrc(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    userDetails();
  }, []);

  const userDetails = async () => {
    console.warn(params);
    let result = await getAsync(`/get-user/${getDecodedToken().user_id}`);
    console.warn(result);
    setFirstName(result.firstName);
    setLastName(result.lastName);
    setEmail(result.email);
    setBirthday(result.birthday);
    if (result._id && result.avatarUrl) {
      setUploadImageSrc(
        `${process.env.REACT_APP_API_URL}/${result._id}/images/${result.avatarUrl}`
      );
    }
  };

  const updateProfile = async () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !birthday ||
      !password ||
      !repeatPassword
    ) {
      setError(true);
      return false;
    }

    let formData = new FormData();
    formData.append("avatar", image);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("birthday", birthday);
    formData.append("password", password);
    formData.append("repeatPassword", repeatPassword);

    const userId = JSON.parse(localStorage.getItem("user")).token;
    console.warn(userId);
    let result = await fetch(
      `${process.env.REACT_APP_API_URL}/update-user/${
        getDecodedToken().user_id
      }`,
      {
        method: "put",
        headers: {
          "x-access-token": `${userId}`,
        },
        body: formData,
      }
    );
    console.log(result);
    window.location.reload();
  };

  const onUploadImage = () => {
    document.getElementById("file_input").click();
  };

  return (
    <div>
      <div className="my-profile_header">
        <h1 className="myProfile-title">My Profile</h1>
        <p className="horizontal_line"></p>
      </div>
      <div className="my-profile_content">
        <div className="section-1">
          <input
            id="file_input"
            style={{ display: "none" }}
            type="file"
            filename="avatar"
            value=""
            onChange={onFileChange}
          />
          <img className="avatarImg" src={uploadImageSrc} alt="" />
          <button
            className="upload-avatar_btn"
            onClick={() => {
              onUploadImage();
            }}
          >
            Upload image
          </button>
        </div>

        <div className="section-2">
          <div className="first_column-inputs">
            <label className="labels">First Name</label>
            <input
              className="inputBox"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {error && !firstName && (
              <span className="invalid-input">Enter valid data!</span>
            )}

            <label className="labels" htmlFor="email">
              Enter Email
            </label>
            <input
              className="inputBox"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && !email && (
              <span className="invalid-input">Enter valid data!</span>
            )}

            <label className="labels">Password</label>
            <input
              className="inputBox"
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && !password && (
              <span className="invalid-input">Enter data!</span>
            )}
            {password !== repeatPassword && (
              <span className="invalid-input">Your password doesn't match</span>
            )}
            <button className="save-btn" onClick={updateProfile}>
              Save
            </button>
          </div>

          <div className="second_column-inputs">
            <label className="labels">Last Name</label>
            <input
              className="inputBox"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {error && !lastName && (
              <span className="invalid-input">Enter valid data!</span>
            )}

            <label className="labels" for="birthday">
              Birthday
            </label>
            <input
              className="inputBox"
              type="date"
              id="birthday"
              name="birthday"
              placeholder="Enter Birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
            {error && !birthday && (
              <span className="invalid-input">Enter valid data!</span>
            )}

            <label className="labels"> Repeat Password</label>
            <input
              className="inputBox"
              type="password"
              placeholder="Repeat your Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            {error && !repeatPassword && (
              <span className="invalid-input">Enter valid data!</span>
            )}
            {password !== repeatPassword && (
              <span className="invalid-input">
                Your password doesen't match
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
