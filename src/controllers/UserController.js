const { userSignJwtAccessToken } = require("../config/jwt");
const { UserCreate } = require("../models/Users/UserCreate");
const {
  emailAlreadyExists,
  findUserById,
  findUserByEmail,
  findUserByIdWithPassword,
} = require("../models/Users/UserFinder");
const { userUpdate } = require("../models/Users/UserUpdate");
const { validateRequiredFields } = require("../utils/utils");
const bcrypt = require("bcrypt");

async function createUser(req, res) {
  try {
    const { nome, email, senha } = req.body;

    const verify = validateRequiredFields({ nome, email, senha });
    if (verify.result) {
      return res.status(400).json({
        mensagem: `Fields not provided: ${verify.missingFields.join(", ")}`,
      });
    }

    const emailExists = await emailAlreadyExists(email);
    if (emailExists) {
      return res.status(400).json({
        mensagem: "Email already exists",
      });
    }

    const user = await UserCreate(nome, email, senha);

    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Internal Server Error" });
  }
}

async function loginUser(req, res) {
  try {
    const { email, senha } = req.body;

    const verify = validateRequiredFields({ email, senha });
    if (verify.result) {
      return res.status(400).json({
        mensagem: `Fields not provided: ${verify.missingFields.join(", ")}`,
      });
    }

    const emailExists = await emailAlreadyExists(email);
    if (!emailExists) {
      return res.status(404).json({ massage: "Email Not Found" });
    }

    const dataUserByEmail = await findUserByEmail(email);

    if (dataUserByEmail.length === 1) {
      const passwordHash = dataUserByEmail[0].senha;

      const passwordCorrect = await bcrypt.compare(senha, passwordHash);

      if (!passwordCorrect) {
        return res.status(401).json({ mensagem: "Email or Password invalid" });
      }
    }

    const { id, nome, email: _ } = dataUserByEmail[0];

    const passwordToken = userSignJwtAccessToken({ id });

    const loggedInUser = {
      usuario: {
        id: id,
        nome: nome,
        email: _,
      },
      token: passwordToken,
    };

    return res.json(loggedInUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Internal Server Error" });
  }
}

async function getUser(req, res) {
  try {
    const id = parseInt(req.user.id);

    const user = await findUserById(id);

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Internal Server Error" });
  }
}

async function updateUser(req, res) {
  try {
    const { nome, email, senha } = req.body;
    const { id } = req.user;

    if (await emailAlreadyExists(email)) {
      return res.status(400).json({
        mensagem: "Email already exist",
      });
    }

    const verify = validateRequiredFields({ nome, email, senha });

    if (verify.result) {
      return res
        .status(400)
        .json({
          mensagem: `Fields not provided: ${verify.missingFields.join(", ")}`,
        });
    }

    await userUpdate(nome, email, senha, id);

    return res.status(204).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Internal Server Error" });
  }
}

module.exports = {
  createUser,
  loginUser,
  getUser,
  updateUser,
};
