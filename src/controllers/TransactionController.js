const { findCategoryById } = require("../models/Categories/CategoryFinder");
const {
  insertTransaction,
} = require("../models/Transactions/TransactionCreate");
const {
  findAllTransactionsByUserId,
  findTransactionById,
} = require("../models/Transactions/TransactionFinder");
const { validateRequiredFields } = require("../utils/utils");
const {
  updateTransactionDb,
} = require("../models/Transactions/TransactionUpdate");
const {
  removeTransaction,
} = require("../models/Transactions/TransactionDelete");

async function listTransactions(req, res) {
  try {
    const { id } = req.user;
    const { filtro } = req.query;

    const transactions = await findAllTransactionsByUserId(id);

    if (!filtro) {
      return res.status(200).json(transactions);
    }

    const filtroCapitalize = filtro.reduce((acc, cur) => {
      return [...acc, cur[0].toUpperCase() + cur.slice(1)];
    }, []);

    const filteredTransactions = transactions.filter((transaction) => {
      if (filtroCapitalize.indexOf(transaction.categoria_nome) != -1) {
        return transaction;
      }
    });

    return res.status(200).json(filteredTransactions);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Internal Server Error" });
  }
}

async function getTransaction(req, res) {
  try {
    const transactionId = parseInt(req.params.id);
    const userId = req.user.id;

    if (isNaN(transactionId)) {
      return res
        .status(400)
        .json({ mensagem: "A number is expected as transaction id" });
    }

    const transaction = await findTransactionById(transactionId, userId);

    if (transaction.rowCount == 0) {
      return res.status(404).json({ mensagem: "Transaction not found" });
    }

    const categoryId = transaction.rows.categoria_id;
    const category = await findCategoryById(categoryId);

    const response = {
      id: transaction.rows.id,
      tipo: transaction.rows.tipo,
      descricao: transaction.rows.descricao,
      valor: transaction.rows.valor,
      data: transaction.rows.data,
      usuario_id: transaction.rows.usuario_id,
      categoria_id: transaction.rows.categoria_id,
      categoria_nome: category.descricao,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Internal Server Error" });
  }
}

async function createTransaction(req, res) {
  try {
    const { tipo, descricao, valor, data, categoria_id } = req.body;
    const { id } = req.user;

    const verify = validateRequiredFields({
      descricao,
      valor,
      data,
      categoria_id,
      tipo,
    });
    if (verify.result) {
      return res.status(400).json({
        mensagem: `Fields not provided: ${verify.missingFields.join(", ")}`,
      });
    }

    const categoryExists = await findCategoryById(categoria_id);
    if (!categoryExists) {
      return res.status(404).json({
        mensagem: "Category not found, existing category id number required",
      });
    }

    if (isNaN(valor)) {
      return res
        .status(400)
        .json({ mensagem: "Invalid field 'valor', number in cents required" });
    }

    if (tipo != "entrada" && tipo != "saida") {
      return res.status(400).json({
        mensagem: `Only accepted exactly text 'entrada' or 'saida' in field 'tipo'`,
      });
    }

    const transaction = await insertTransaction(
      id,
      tipo,
      descricao,
      valor,
      data,
      categoria_id
    );
    if (!transaction) {
      return res.status(500).json({ mensagem: "Internal Server Error" });
    }

    const category = await findCategoryById(categoria_id);

    const response = {
      id: transaction.id,
      tipo,
      descricao,
      valor,
      data,
      usuario_id: id,
      categoria_id,
      categoria_nome: category.descricao,
    };

    console.log(response);

    return res.status(201).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Internal Server Error" });
  }
}

async function updateTrasaction(req, res) {
  const { descricao, valor, data, categoria_id, tipo } = req.body;
  const userId = req.user.id;
  const transactionId = Number(req.params.id);

  try {
    const verify = validateRequiredFields({
      descricao,
      valor,
      data,
      categoria_id,
      tipo,
    });
    if (verify.result) {
      return res.status(400).json({
        mensagem: `Fields not provided: ${verify.missingFields.join(", ")}`,
      });
    }

    const transaction = await findTransactionById(transactionId, userId);

    if (!transaction.rowCount) {
      return res.status(404).json({ mensagem: "Transaction not found" });
    }

    const categoryExist = await findCategoryById(categoria_id);

    if (!categoryExist) {
      return res.status(404).json({ mensagem: "Category not found" });
    }

    if (tipo != "entrada" && tipo != "saida") {
      return res.status(400).json({
        mensagem: `Only accepted exactly text 'entrada' or 'saida' in field 'tipo'`,
      });
    }

    await updateTransactionDb(
      transaction.rows.id,
      tipo,
      descricao,
      valor,
      data,
      categoria_id
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Internal Server Error" });
  }
}

async function deleteTransaction(req, res) {
  try {
    const transactionId = parseInt(req.params.id);
    const userId = req.user.id;

    const transaction = await findTransactionById(transactionId, userId);
    if (transaction.rowCount == 0) {
      return res.status(404).json({ mensagem: "Transaction not found" });
    }

    await removeTransaction(transactionId);
    return res.status(204).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Internal Server Error" });
  }
}

async function getExtract(req, res) {
  const { id } = req.user;

  const transactions = await findAllTransactionsByUserId(id);

  const entrada = transactions.reduce((acc, cur) => {
    if (cur.tipo === "entrada") {
      return acc + cur.valor;
    }
    return acc;
  }, 0);

  const saida = transactions.reduce((acc, cur) => {
    if (cur.tipo === "saida") {
      return acc + cur.valor;
    }
    return acc;
  }, 0);

  const response = {
    entrada,
    saida,
  };

  return res.status(200).json(response);
}

module.exports = {
  listTransactions,
  getTransaction,
  createTransaction,
  updateTrasaction,
  deleteTransaction,
  getExtract,
};
