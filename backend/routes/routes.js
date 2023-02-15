const express = require("express");
const userController = require("../controllers/user");
const recepiesController = require("../controllers/recepies");
const multer = require("multer");
const router = express.Router();
const auth = require("../middleware/auth");
const fs = require("fs");

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		try {
			//Check if directory exists
			fs.lstatSync(`./public/${req.user.user_id}/images`).isDirectory();
		} catch {
			// If it doesnt exists create it
			fs.mkdirSync(`./public/${req.user.user_id}/images`, { recursive: true });
		}

		callback(null, `./public/${req.user.user_id}/images`);
	},
	filename: (req, file, callback) => {
		callback(null, file.originalname);
	},
});

const filefilter = (req, file, cb) => {
	if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const upload = multer({ storage: storage, fileFilter: filefilter });

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/get-user/:id", auth, userController.getUser);
router.put("/update-user/:id", auth, upload.single("avatar"), userController.updateUser);
router.post("/add-recepies", auth, upload.single("recipeImage"), recepiesController.addRecepies);

router.get("/recipes", recepiesController.listAllRecepies);
router.get("/my-recipes", auth, recepiesController.listRecipes);
router.delete("/delete-recipe/:id", auth, recepiesController.deleteRecipe);
router.get("/single-recipe/:id", auth, recepiesController.getSingleRecipe);
router.put("/update-recipe/:id", auth, upload.single("recipeImage"), recepiesController.updateRecipe);
router.get("/recipe-details/:id", recepiesController.getRecipeDetails);

router.put("/recipe-details/:id/rate", auth, recepiesController.updateRecipeRating);

module.exports = router;
