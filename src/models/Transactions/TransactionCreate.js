const pool = require("../../config/conexao");

async function insertTransaction(
  id,
  tipo,
  descricao,
  valor,
  data,
  categoria_id
) {
  try {
    const { rows } = await pool.query(
      `
    INSERT INTO transacoes (usuario_id, tipo, descricao, valor, data, categoria_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, tipo, descricao, valor, data, categoria_id
    `,
      [id, tipo, descricao, valor, data, categoria_id]
    );
    return rows[0];
  } catch (error) {
    console.log(error);
    return;
  }
}

module.exports = {
  insertTransaction,
};
