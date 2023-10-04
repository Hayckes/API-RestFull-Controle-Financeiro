const pool = require("../../config/conexao");

async function findAllTransactionsByUserId(id) {
  try {
    const { rows } = await pool.query(
      `SELECT transacoes.id,
      transacoes.tipo,
      transacoes.descricao,
      transacoes.valor,
      transacoes.data,
      transacoes.usuario_id,
      transacoes.categoria_id,
      categorias.descricao as categoria_nome
      FROM transacoes
      JOIN categorias ON transacoes.categoria_id = categorias.id
      WHERE usuario_id = $1`,
      [id]
    );

    return rows;
  } catch (error) {
    console.log(error);
    return;
  }
}

async function findTransactionById(transactionId, userId) {
  try {
    const { rows, rowCount } = await pool.query(
      `SELECT * 
      FROM transacoes
      WHERE id = $1 AND usuario_id = $2`,
      [transactionId, userId]
    );

    return {
      rows: rows[0],
      rowCount,
    };
  } catch (error) {
    console.log(error);
    return;
  }
}

module.exports = {
  findAllTransactionsByUserId,
  findTransactionById,
};
