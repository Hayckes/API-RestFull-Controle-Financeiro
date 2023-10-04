const pool = require("../../config/conexao");
const bcrypt = require("bcrypt");

async function UserCreate(nome, email, senha) {
  try {
    const hash = await bcrypt.hash(senha, 10);

    const { rows } = await pool.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *",
      [nome, email, hash]
    );

    const { senha: _, ...userWithoutPassword } = rows[0];
    return userWithoutPassword;
  } catch (error) {
    console.log(error);
    return { mensagem: "Internal Server Error" };
  }
}

module.exports = {
  UserCreate,
};
