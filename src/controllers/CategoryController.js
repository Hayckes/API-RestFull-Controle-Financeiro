const { findAllCategories } = require("../models/Categories/CategoryFinder");

async function listAllCategories(req, res) {
  try {
    const categories = await findAllCategories();

    return res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Internal Server Error" });
  }
}

module.exports = {
  listAllCategories,
};
