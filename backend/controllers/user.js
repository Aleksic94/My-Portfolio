const userDb = require("../db/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  signup: async (req, res) => {
    try {
      const { firstName, lastName, email, birthday, password, repeatPassword } =
        req.body;

      if (password !== repeatPassword) {
        res.status(400).send("Passwords did not match!");
        return;
      }

      if (!userDb.validateSchema(req.body)) {
        res.status(400).send("All input is required");
        return;
      }

      const oldUser = await userDb.db.findOne({ email });

      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }

      //Encrypt user password
      const encryptedPassword = await bcrypt.hash(password, 10);

      // Create user in our database
      await userDb.db.create({
        firstName: firstName,
        lastName: lastName,
        email: email.toLowerCase(),
        birthday: birthday,
        password: encryptedPassword,
      });

      res.status(201).send({});
    } catch (err) {
      console.log(err);
    }
  },

  login: async (req, res) => {
    if (req && req.body && req.body.password && req.body.email) {
      let user = await userDb.db.findOne({ email: req.body.email });

      if (user) {
        let validPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );

        if (!validPassword) {
          res
            .status(400)
            .send({ result: "Password or email are not correct!" });
          return;
        }

        // Create token
        const token = jwt.sign(
          { user_id: user._id, email: user.email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        // save user token
        const response = {
          token: token,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          birthday: user.birthday,
        };

        res.send(response);
      } else {
        res.status(400).send({ result: "No User found" });
        return;
      }
    } else {
      res.status(400).send({ result: "No user found" });
      return;
    }
  },

  updateUser: async (req, res) => {
    if (
      !(
        req &&
        req.body &&
        req.params &&
        req.params.id &&
        req.body.password === req.body.repeatPassword
      )
    ) {
      res.status(400).send({ result: "Request not valid!" });
      return;
    }

    let user = await userDb.db.findOne({ _id: req.params.id });

    if (!user) {
      res.status(404).send({ result: "User not found!" });
      return;
    }

    console.log(req.body);
    if (!userDb.validateSchema(req.body)) {
      res.status(400).send("All input is required");
      return;
    }

    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);

    let dbUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      birthday: req.body.birthday,
      password: encryptedPassword,
      avatarUrl:
        req.file && req.file.originalname
          ? req.file.originalname
          : user.avatarUrl,
    };

    let result = await userDb.db.updateOne(
      { _id: req.params.id },
      { $set: dbUser }
    );
    res.status(200).send(result);
  },
  getUser: async (req, res) => {
    let user = await userDb.db.findOne({ _id: req.params.id });
    if (user) {
      res.send(user);
    } else {
      res.send("User not found");
    }
  },
};
