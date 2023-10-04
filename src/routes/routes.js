const express = require("express");
const router = express.Router();
const {
  createUser,
  getUser,
  loginUser,
  updateUser,
} = require("../controllers/UserController");
const {
  listTransactions,
  getTransaction,
  createTransaction,
  updateTrasaction,
  deleteTransaction,
  getExtract,
} = require("../controllers/TransactionController");

const { Auth } = require("../middlewares/Auth");
const { listAllCategories } = require("../controllers/CategoryController");

// Before Auth Token
router.post("/usuario", createUser);
router.post("/login", loginUser);

// Auth
router.use(Auth);

// User Controller
router.get("/usuario", getUser);
router.put("/usuario", updateUser);

// Category Controller
router.get("/categoria", listAllCategories);

// Transaction Controller
router.get("/transacao/extrato", getExtract);
router.get("/transacao", listTransactions);
router.get("/transacao/:id", getTransaction);
router.post("/transacao", createTransaction);
router.put("/transacao/:id", updateTrasaction);
router.delete("/transacao/:id", deleteTransaction);

module.exports = router;
