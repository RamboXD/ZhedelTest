const Router = require("express");
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { check, validationResult } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware.js");
const router = new Router();

const generateJwt = (id, email) => {
  return jwt.sign({ id, email }, process.env.secretKey, { expiresIn: "24h" });
};

router.post(
  "/registration",
  [
    check("email", "Uncorrect email").isEmail(),
    check(
      "password",
      "Жасырын сөз кемінде 3 барынша 12 символдан тұру қажет"
    ).isLength({ min: 3, max: 12 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Почта немесе жасырын сөз талапқа сай емес",
          errors,
        });
      }

      const { firstName, lastName, email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({
          message: `Бұл почта ${email} бос емес, тіркеліп қойған аккаунт бар`,
        });
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const user = new User({
        firstName,
        lastName,
        email,
        password: hashPassword,
      });
      await user.save();
      const token = jwt.sign({ id: user.id }, process.env.secretKey, {
        expiresIn: "1h",
      });

      return res.json({
        firstName,
        lastName,
        token,
        message: "Аккаунт құрылды",
      });
    } catch (e) {
      console.log(e);
      res.status(200).send({ message: "Server error" });
    }
  }
);

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: `${email} Аккаунт табылмады` });
    }

    const isPassValid = bcrypt.compareSync(password, user.password);
    if (!isPassValid) {
      return res.status(404).json({ message: "Жасырын сөз қате енгізілді" });
    }
    const token = jwt.sign({ id: user.id }, process.env.secretKey, {
      expiresIn: "1h",
    });
    return res.json({
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
        email: user.email,
      },
      message: "Аккаунтқа кірді)",
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
});

router.get("/auth", authMiddleware, async (req, res) => {
  const token = generateJwt(req.user.id, req.user.email);
  return res.json({ token });
});
module.exports = router;
