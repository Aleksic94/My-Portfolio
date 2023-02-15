const Recepies = require("../db/Recepies");

module.exports = {
  addRecepies: async (req, res, next) => {
    try {
      const recipe = new Recepies({
        title: req.body.title,
        category: req.body.category,
        prepTime: req.body.prepTime,
        numPeople: req.body.numPeople,
        description: req.body.description,
        recepie: req.body.recepie,
        userId: req.user.user_id,
        recipeImageUrl: req.file.originalname,
      });
      await recipe.save();

      res.status(201).send("Recipe Uploaded Successfully");
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  listRecipes: async (req, res) => {
    const recipe = await Recepies.find({
      userId: req.user.user_id,
    });
    if (recipe.length > 0) {
      res.send(recipe);
    } else {
      res.send([]);
    }
  },
  listAllRecepies: async (req, res) => {
    let filter = null;
    if (req.query) {
      filter = {};
      if (req.query.limit) {
        filter.limit = Number.parseInt(req.query.limit);
      }

      if (req.query.orderBy) {
        filter.sort = { [req.query.orderBy]: -1 };
      }
    }

    const recipes = await Recepies.find().sort(filter.sort).limit(filter.limit);

    if (recipes.length > 0) {
      res.send(recipes);
    } else {
      res.send([]);
    }
  },
  deleteRecipe: async (req, res) => {
    let result = await Recepies.deleteOne({ _id: req.params.id });
    res.send(result);
  },
  getSingleRecipe: async (req, res) => {
    let result = await Recepies.findOne({ _id: req.params.id });
    if (result) {
      res.send(result);
    } else {
      res.send("No recipe found");
    }
  },

  updateRecipe: async (req, res) => {
    let result = await Recepies.findOne({ _id: req.params.id });
    if (!result) {
      res.send("No recipe found");
    }
    await Recepies.updateOne(
      { _id: req.params.id },
      {
        $set: {
          ...req.body,
          recipeImageUrl:
            req.file && req.file.originalname
              ? req.file.originalname
              : result.recipeImageUrl,
        },
      }
    );
    res.send(result);
  },

  getRecipeDetails: async (req, res) => {
    let details = await Recepies.findOne({ _id: req.params.id });
    if (details) {
      res.send(details);
    } else {
      res.send("No recipe found");
    }
  },

  updateRecipeRating: async (req, res) => {
    let recipe = await Recepies.findOne({ _id: req.params.id });

    if (!recipe) {
      res.send("No recipe found");
    }

    let recipeRatings = recipe.ratings;

    if (!recipeRatings) {
      recipeRatings = [];
    }

    if (recipeRatings.some((x) => x === req.user.user_id)) {
      recipeRatings = recipeRatings.filter((x) => x !== req.user.user_id);
    } else {
      recipeRatings.push(req.user.user_id);
    }

    try {
      await Recepies.updateOne(
        { _id: req.params.id },
        { $set: { ratings: recipeRatings, numOfVotes: recipeRatings.length } }
      );
      res.send({ ...recipe, ratings: recipeRatings });
    } catch (err) {
      console.log(err);
    }
  },
};
