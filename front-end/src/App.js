import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import MyRecipes from "./components/MyRecipes";
import MyProfile from "./components/MyProfile";
import AddRecipe from "./components/AddRecipe";
import UpdateRecipes from "./components/UpdateRecipes";
import Home from "./components/Home";
import Breakfast from "./components/Breakfast";
import Brunch from "./components/Brunch";
import Lunch from "./components/Lunch";
import Dinner from "./components/Dinner";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/breakfast" element={<Breakfast />} />
          <Route path="/brunch" element={<Brunch />} />
          <Route path="/lunch" element={<Lunch />} />
          <Route path="/dinner" element={<Dinner />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-recipes" element={<MyRecipes />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/logout" />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/add-save-recepie" element={<AddRecipe />} />
          <Route path="/update-recipe/:id" element={<UpdateRecipes />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
