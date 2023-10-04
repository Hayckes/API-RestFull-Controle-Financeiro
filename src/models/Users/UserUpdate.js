const pool = require("../../config/conexao");
const bcrypt = require("bcrypt");

async function userUpdate(nome, email, senha, id) {
  try {
    const hash = await bcrypt.hash(senha, 10);

    const { rows } = await pool.query(
      `UPDATE usuarios 
      SET nome = $1, email = $2, senha = $3 
      WHERE id = $4 
      RETURNING *;`,
      [nome, email, hash, id]
    );

    const { senha: _, ...userWithoutPassword } = rows[0];
    return userWithoutPassword;
  } catch (error) {
    console.error(error);
    return { mensagem: "Internal Server Error" };
  }
}

module.exports = {
  userUpdate,
};
