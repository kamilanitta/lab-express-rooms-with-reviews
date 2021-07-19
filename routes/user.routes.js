const router = require("express").Router();
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const UserModel = require("../models/User.model");

router.post("/signup", async (req, res, next) => {
  const userData = req.body;

  const user = await UserModel.findOne({ email: userData.email });

  if (user) {
    return res.status(400).json({ error: "Este usuário já existe!" });
  }
  // 3. Criptografar a senha
  const salt = bcrypt.genSaltSync(saltRounds);

  const hashedPassword = bcrypt.hashSync(userData.password);

  //. Insere o usuário no banco
  const insertResult = await UserModelo.create({
    name: userData.name,
    email: userData.email,
    passwordHash: hashedPassword,
  });
  //5. Responde msg de sucesso

  //Status
  return res.status(201).json(insertResult);
});

module.exports = router;
