const pool = require("../../config/conexao");

async function findAllCategories() {
  try {
    const { rows } = await pool.query("SELECT * FROM categorias");

    return rows;
  } catch (error) {
    console.log(error);
    return;
  }
}

async function findCategoryById(id) {
  try {
    const { rows } = await pool.query(
      `
    SELECT descricao 
    FROM categorias 
    WHERE id = $1
    `,
      [id]
    );
    return rows[0];
  } catch (error) {
    console.log(error);
    return;
  }
}

module.exports = {
  findAllCategories,
  findCategoryById,
};
