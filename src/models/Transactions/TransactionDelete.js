const pool = require("../../config/conexao");

async function removeTransaction(id) {
  try {
    await pool.query(
      `
        DELETE FROM transacoes
        WHERE id = $1
        `,
      [id]
    );
    return;
  } catch (error) {
    console.log(error);
    return;
  }
}

module.exports = { removeTransaction };
