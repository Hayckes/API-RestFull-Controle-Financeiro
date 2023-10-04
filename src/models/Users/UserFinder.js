const pool = require("../../config/conexao");

async function emailAlreadyExists(email) {
  try {
    const { rowCount } = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );
    if (rowCount > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function findUserById(id) {
  try {
    const { rows, rowCount } = await pool.query(
      "SELECT * FROM usuarios WHERE id = $1",
      [id]
    );
    if (rowCount > 0) {
      const { senha, ...userWithoutPassword } = rows[0];
      return userWithoutPassword;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Internal Server Error" });
  }
}

async function findUserByIdWithPassword(id) {
  try {
    const { rows, rowCount } = await pool.query(
      "SELECT * FROM usuarios WHERE id = $1",
      [id]
    );
    if (rowCount > 0) {
      return rows[0];
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Internal Server Error" });
  }
}

async function findUserByEmail(email) {
  try {
    const { rowCount, rows } = await pool.query(
      "SELECT * FROM usuarios WHERE email ILIKE $1",
      [email]
    );
    if (rowCount > 0) {
      return rows;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  emailAlreadyExists,
  findUserById,
  findUserByEmail,
  findUserByIdWithPassword,
};
