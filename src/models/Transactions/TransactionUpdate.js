const pool = require("../../config/conexao");

async function updateTransactionDb(
  id,
  tipo,
  descricao,
  valor,
  data,
  categoria_id
) {
  try {
    await pool.query(
      `
      UPDATE transacoes SET tipo = $2, descricao = $3, valor = $4, data = $5, categoria_id = $6
      WHERE id = $1
      `,
      [id, tipo, descricao, valor, data, categoria_id]
    );
    return;
  } catch (error) {
    console.log(error);
    return;
  }
}

module.exports = {
  updateTransactionDb,
};
